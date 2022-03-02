// dependency
const path = require('path');
const User = require('./../models/user');
const exercise = require('./../models/exercise')

// initialization of controller container
const controllers = {};

// home
controllers.home = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, './../views/exercise-tracker.html'))
    } catch(err) {
        console.log(err)
        res.send(err);
    }
}

// post user 
controllers.postUser = async (req, res) => {
    let {username} = req.body;
    username = typeof username == 'string' && username.trim().length > 0 ? username : false; 
        if (username) {
            try {
                const newUser = await User.create({username})
                if(!newUser) throw {'msg' : 'Unable to create new user'}
                res.status(200).json(newUser)
            } catch(err) {
                console.log(err)
                res.status(500).send(err)
            }
        } else {
            res.status(500).send({'Error' : 'Missing require field'})
        }
}

// get user
controllers.getUser = async (req, res) => {
    try {
        const allUser = await User.find()
        if(!allUser) throw {'msg' : 'No user found'};
        res.status(200).json(allUser)
    } catch (err) {
        console.log(err)
        res.status(500).send(500)
    }
}

// post exercise 
controllers.postExercise = async (req, res) => {
    let {description, duration, date } = req.body;
    let userId = req.body[':_id'];
    duration = +(duration);
    // validation of input
    userId = typeof userId == 'string' && userId.trim().length == 24 ? userId.trim() : false;
    description = typeof description == 'string' && description.trim().length > 0 ? description.trim() : false;
    duration = typeof duration == 'number' && duration > 0 ? duration : false;
    date = typeof date == 'string' ?  new Date(date) : new date();
    date = date == "Invalid Date" ? new Date() : date
    date = date.toDateString()
    if(userId && description && duration && date) {
        const userDetails = {
            userId,
            description,
            duration,
            date
        }
        console.log(userDetails.date)
        console.log('Requirement met')
        try {
            const user = await User.findById(userId)
            if(!user) throw {msg : 'User not found / Error in finding user'}
            console.log(user.username)
            const savedExer = await exercise.find({username : user.username})
            if(!savedExer[0]) {
                const newExer = await exercise.create( {
                        username : user.username,
                        count : 1,
                        _id : userId,
                        log : [{
                            description: userDetails.description,
                            duration: userDetails.duration,
                            date: userDetails.date
                        }]
                    })
                    console.log(newExer)
            } else {
                exercise.updateOne({_id: userId, "log._id": savedExer[0].log[0].id}, 
                {
                 count: (savedExer[0].log.length) + 1,
                 "$push" : {log: {
                    description: userDetails.description,
                    duration: userDetails.duration,
                    date: userDetails.date
                   }
                 }
                }, (err, updateLog) => {
                 if(err) console.log(err)
                 console.log('succesfully Update data ')
               })
            }
            res.status(200).json({
                username: user.username,
                description: userDetails.description,
                duration: userDetails.duration,
                date: userDetails.date,
                _id: userId
              })
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }

    } else {
        console.log({"Error" : "Missing require field"});
        res.status(500).send({"Error" : "Missing require field"})
    }




}

// export of module
module.exports = controllers



// console.log(user['_id'])
// const newExer = new exercise ( {
//     username : user.username,
//     count : 1,
//     _id : userId,
//     log : [{
//         description: userDetails.description,
//         duration: userDetails.duration,
//         date: userDetails.date
//     }]
// })
// console.log(newExer)
// const savedExer = await newExer.save();
// if(!savedExer) throw {msg : 'Unable to save Your exercise'}
// res.json(savedExer)