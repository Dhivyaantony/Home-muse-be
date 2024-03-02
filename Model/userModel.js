
const mongoose=require('mongoose');
const userSchema= mongoose.Schema({
    fName: {
        type:String,
        required:true,
    },
    lName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        required:true,
        default:3
        //user role 3
        //venter role  2
        //admin role 1
    },
});
const users=mongoose.model('users',userSchema);
module.exports=users