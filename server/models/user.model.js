const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ =require('lodash');

var userSchema = new mongoose.Schema({
 
    firstname: {
        type: String,
        required: 'Firstname can\'t be empty'
    },
    lastname: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [6,'Password must be atleast 4 character long']
    },
    Role : {
        type :String ,
    },
 
    imagePath: {
         type: String 
        },

    saltSecret: String
},
);

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
        
            next();
        });
    });
});
userSchema.methods.verifyPassword=function(password){
   return bcrypt.compareSync(password,this.password); 
  //return(this.password===password)
}
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id,
    Role :this.Role ,
    firstname:this.firstname,
    lastname:this.lastname ,
},
        process.env.JWT_SECRET
    );
}
/* userSchema.method("toJSON",function (){
    const {__v , _id , ...object}=this.toObject() ;
    object.id=_id ;
    return object ;
   }) */
mongoose.model('User', userSchema);