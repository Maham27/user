const mongoose=require("mongoose");
mongoose.connect(process.env.mongo_url);
const connects=mongoose.connection;
connects.on('connected',()=>
{
console.log('mongo is connected');
})
connects.on('error',(error)=>
{
console.log('error',error);
});

module.exports=mongoose;

