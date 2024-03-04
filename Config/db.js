const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://dhivyaantony778:DEPBKtsQMeNe7kc9@cluster0.9wapanv.mongodb.net/', {
            useNewUrlParser:"true"
        });
        console.log("Mongodb database connected");
       
    }
catch(err){
    console.log(err);
}
}
module.exports=connectDb
