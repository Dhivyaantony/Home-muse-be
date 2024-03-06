const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://dhivyaantony778:qoyiaisDGQfchl5U@cluster0.3hrj9ak.mongodb.net/', {
            useNewUrlParser:"true"
        });
        console.log("Mongodb database connected");
       
    }
catch(err){
    console.log(err);
}
}
module.exports=connectDb
//mongodb+srv://dhivyaantony778:<password>@cluster0.3hrj9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0//