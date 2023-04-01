const jsontoken = require("jsonwebtoken");


module.exports=async(req,res,next)=>{
try {
    
    const token=req.headers["authorization"].split(" ")[1];
    jsontoken.verify(token,process.env.jwtsecret,(err,decoded)=>
    {
        if(err)
        {

            return res.status(401).send({
                message:"auth is failed",
                success:false,
            });
        }
        else
        {
            req.body.userId=decoded.id;
            next();
        }
    });
}
    
 catch (error) {
    return res.status(401).send({
      message: "auth is failed",
      success: false,
    });
    
}
};