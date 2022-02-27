/* 
*
* file contains lib functions 
* */

//initialization of lib container  
const lib = {};

// save url
lib.saveDoc = async (model, data) => {
    const reqModel = model;
    const modeldoc = new reqModel(data)
    try {
       const savedDoc = await modeldoc.save()
       console.log('document saved successfully')
       return savedDoc
    } catch(err) {
        console.log(err)
    }
}



module.exports = lib;