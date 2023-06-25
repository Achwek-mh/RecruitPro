const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const _ =require('lodash');
const User = mongoose.model('User');
const PasswordReset = mongoose.model('PasswordReset');
const {v4 :uuidv4}=require ('uuid')
const nodemailer =require("nodemailer")

const crypto = require('crypto');
const { result } = require('lodash');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "achwekmhenni123@gmail.com",
      pass: "xxxxxxxxxx",
    },
  });

transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
});

module.exports.register = (req, res, next) => {
  
 

    var user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname ;
    user.email = req.body.email;
    user.password = req.body.password;
    user.Role =req.body.Role;
    user.imgName =req.body.imgName
   user.imagePath='http://localhost:3000/images/' + req.file.filename; 
   
    user.save((err, doc) => {
        if (!err){
            res.send(doc);
          if(doc.imagePath){
            console.log(doc)
          }
        }
        else {
            if (err.code == 11000)
                res.status(422).send([' email address found.']);
            else
                return next(err);
        }

    });
if (user.Role !== 'Admin')
   { var mailOptions = {
      to: req.body.email,
      from: "achwekmhenni123@gmail.com",
      subject: 'Your account password',
      text: 'this is your password:\n\n' +`${user.password}`
     
      }
      transporter.sendMail(mailOptions, (error) => {
          if (error) {
            res.json({ status: "ERROR" });
          } else { console.log("sent")
            res.json({ status: "Message Sent" , message :"seeent"});
          }});}

}



module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {       
        if (err) return res.status(400).json(err);
        else if (user) {return res.status(200).json({ firstname :user.firstname,lastname :user.lastname,email :user.email,Role :user.Role,imagePath :user.imagePath ,"token": user.generateJwt() });
      }
        else return res.status(404).json(info);
    })(req, res);
}

 module.exports.userProfile = (req, res, next) =>{
  const id =req.params.id

    User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found candidat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving candidat with id=" + id });
    });
} 
module.exports.usersProfile = (req, res, next) =>{
  

    User.find().exec((err,user)=>{
      if(!err){
          res.json(user)
          
      }
     })
}
module.exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. `
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
module.exports.update = (req,res)=>{
    
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)  .then(data => {
    if (!req.body) {
      return res.status(400).send(
         ['Data to update can not be empty!']
      );
    }
    if (!data) {
      res.status(404).send({
        message: `Cannot update user with id=${id}. Maybe user was not found!`
      });
    } else res.send({ message: "user was updated successfully." });
  })
  .catch(err => {
    
    res.send({ message: "error" });
  });
};






module.exports.forgotpassword = async (req,res)=> {
    if (!req.body.email) {
    return res
    .status(500)
    .json({ message: 'Email is required' });
    }
    const user = await User.findOne({
    email:req.body.email
    });
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Email does not exist' });
    }
    
    var resettoken = new PasswordReset({ userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
    //console.log(_userId)
    resettoken.save(function (err) {
        console.log(resettoken.userId)

    if (err) { return res.status(500).send({ msg: err.message }); }
    PasswordReset.find({ userId: user._id, resettoken: { $ne: resettoken.resettoken } }).deleteOne().exec();

    res.status(200).json({ message: 'Reset Password successfully.' });
 
    var mailOptions = {
    to: req.body.email,
    from: "achwekmhenni123@gmail.com",
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your •••••••browser to complete the process:\n\n' +
    'http://localhost:4200/#/response-pass/' + resettoken.resettoken + '\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.json({ status: "ERROR" });
        } else { console.log("sent")
          res.json({ status: "Message Sent" , message :"seeent"});
        }});
    })
    }

module.exports.validPassToken =async (req, res)=> {
    if (!req.body.resettoken) {
    return res
    .status(500)
    .json({ message: 'Token is required' });
    }
    const user = await PasswordReset.findOne({
    resettoken: req.body.resettoken
    });
    if (!user) {
    return res
    .status(409)
    .json({ message: 'Invalid URL' });
    }
  
    User.findOneAndUpdate({ id: user.userId}).then(() => {
     console.log(user.userId)
    res.status(200).json({ message: 'Token verified successfully.' });
    }).catch((err) => {
    return res.status(500).send({ msg: err.message });
    });
},
module.exports.newPass  =async (req, res)=> {
        PasswordReset.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
            console.log(userToken)
          if (!userToken) {
            return res
              .status(409)
              .json({ message: 'Token has expired' });
          }
    
          User.findOne({
            _id: userToken.userId
          
          }, function (err, userEmail, next) {
            console.log(userToken.userId)
            console.log(userEmail)
            if (!userEmail) {
                
              return res
                .status(409)
                .json({ message: 'User does not exist' });
            }
      
     
            bcrypt.genSalt(10,async (err, salt) => {
             const hash = await  bcrypt.hash(req.body.newPassword, salt)
                  console.log(req.body.newPassword)
              console.log(hash)
              console.log(salt)
                 User.updateOne(
                { _id: userEmail._id},
                { $set: { password: hash } },
                { new: true } , function (err, docs) {
                  if (err){
                      console.log(err)
                  }
                  else{
                  
                      console.log("Updated Docs : ", docs);
                      userToken.remove();
                      res.status(200).json({ message: 'Password was successfully changed.' })
                  }
              }
              )
              ; });
                
                
               
  

            
           
            }); 
      
          })
      }
  


     
    



