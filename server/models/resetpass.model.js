const mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectId;
var PasswordResetSchema = new mongoose.Schema ({
    userId : mongoose.Schema.Types.ObjectId,
    resettoken:String ,
    createdAt : Date,
    expiresAt :Date,
})
mongoose.model('PasswordReset',PasswordResetSchema)