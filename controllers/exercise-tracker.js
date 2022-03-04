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
   
    const { _id } = req.params
    const { description, duration } = req.body
    let { date } = req.body
    const checkDate = new Date(date)
    if (!date || checkDate.toString() === 'Invalid Date') date = new Date()
    try {
      const user = await User.findById(_id).lean()
      if (!user) throw {msg: 'UserNotFound'}

      const newExer = new exercise ( {
        username: user.username,
        description : description,
        duration : duration,
        date : new Date (date)
      })

      const exercises = await newExer.save();
      if (!exercises) throw { msg: 'FailedPostExercise' }
      user.description = exercises.description
      user.duration = exercises.duration
      user.date = (new Date (exercises.date)).toDateString()
    //   console.log(user)
      delete user.__v
      res.status(201).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }

}

// get logs
controllers.getLogs = async (req, res) => {
    const id = req.params._id;
    let from = req.query.from;
    let to = req.query.to;
    let limit = req.query.limit;
  
    User.findById(id, "username", function (err, user) {
      if (err) console.error(err);
  
      const username = user.username;
      let queryFilter = { username: username };
;
        if (from) {
            from = new Date(from).getTime()
        } else {
            from = new Date(0).getTime()
        }
        if (to) {
            to = new Date(to).getTime()
        } else {
            to = new Date().getTime() //make the date equal to now, so get query till current date
        }
        if (limit === undefined) {
            limit = 0
        }
  
      const exerciseQuery = exercise.find(queryFilter, "description duration date");
  
      exerciseQuery.exec(function (err, exercises) {
        if (err) console.error(err);
  
        let exerciseList = exercises.map(function (exercise) {
          return {
              description : exercise.description,
              duration : exercise.duration,
              date : exercise.date,
          }
        })
        exercises.map(exercise => {
            date = new Date(exercise.date).getTime()
            // console.log(date)
            return(date)
        })
        exerciseList = exerciseList.filter(log => {
            return (new Date(log.date)).getTime() >= from &&  (new Date(log.date)).getTime() <= to
          })

        exerciseList = exerciseList.map(exercise => {
            return {
                description : exercise.description,
                duration : exercise.duration,
                date : new Date(exercise.date).toDateString()
            }
        })
        if(limit > 0) {
            exerciseList = exerciseList.filter((exercise, i) => {
                if(i < limit) {
                    return {
                        description : exercise.description,
                        duration : exercise.duration,
                        date : exercise.date
                    }
                }
            })
        }        
        const exerciseCount = exerciseList.length;
        res.json({
            _id: id,
          username: username,
          count: exerciseCount,
          log: exerciseList
        });
      });
    });
}

// export of module
module.exports = controllers
