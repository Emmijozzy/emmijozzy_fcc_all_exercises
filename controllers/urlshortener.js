/* 
*
* file controls urlshortener project
*/

// dependency
const path = require('path');
const shortid = require('shortid')
const shortUrl = require('./../models/urlshortener')
const lib = require('./../lib/index')

// initialization of controllers container
const controllers = {};

// home controller
controllers.home = async (req, res) => {
   try {
        res.sendFile(path.join(__dirname, './../views/urlshortener.html'))
   } catch(err) {
       console.log(err)
       res.send(err)
   }
}


// urlshortener
controllers.urlshortener = async (req, res) => {
// formation of regex
  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const regex = new RegExp(expression);

  let clientRequestedUrl = req.body.url;
  let savedUrl;
    try {
        if (clientRequestedUrl.match(regex)) {

            clientRequestedUrl = clientRequestedUrl
        
            const suffix = shortid.generate()
        
            const newURL = { 
              original_url :clientRequestedUrl, 
              short_url : suffix
            }

            await lib.saveDoc(shortUrl, newURL)
                .then((result) => {
                    savedUrl = result
                })
                .catch (err => {
                    console.log(err)
                }) 
            // console.log(savedUrl);

            res.json({
                original_url : savedUrl.original_url,
                short_url : savedUrl.short_url
            })
          } else {
            res.json({ error: 'invalid url' })
          }

        } catch(err) {
            console.log(err)
            res.send(err)
        }       

}

controllers.getUrl = async (req, res) => {
    let userGeneratedShortlink = req.params.suffix;
    let foundDoc;
     await shortUrl.find({short_url: userGeneratedShortlink}) 
        .then( result => {
            foundDoc = result[0]
        })
        .catch(err => {
            console.log(err)
        } )
      res.redirect(foundDoc.original_url)
  }

// Export of module
module.exports = controllers