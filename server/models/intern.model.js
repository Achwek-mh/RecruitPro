const mongoose = require('mongoose');
var internSchema =  new mongoose.Schema({
  
    Name : {
        type:String,
        required: 'Name can\'t be empty',
        minlength : [6,'Name can\'t be less than 6 characters']
    
    },
    Email : {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    Post: {
        type: String,
        required: 'Post can\'t be empty',
       
    },
    Scheduled_date: {
        type: String,
       
    },
    state: {
        type: String,
       
    },
    Manager_Concerned :{
        type: String,
    },
    Result: {
        type: String,
    },
    Date2: {
        type: String,
    },
    Time :{
        type:String
    }
 
    })
    internSchema.method("toJSON",function (){
        const {__v , _id , ...object}=this.toObject() ;
        object.id=_id ;
        return object ;
    })
    internSchema.path('Email').validate((val) => {
        emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(val);
    }, 'Invalid e-mail.');
    mongoose.model('Intern', internSchema);
