const jwt = require("jsonwebtoken");

function auth(req,res,next){
  const token = req.headers["authorization"];
  if(!token) return res.send("No token");

  try{
    const data = jwt.verify(token,"secret");
    req.user = data;
    next();
  }catch{
    res.send("Invalid token");
  }
}

function adminOnly(req,res,next){
  if(req.user.role !== "admin")
    return res.send("Admin only");
  next();
}

function ownerOnly(req,res,next){
  if(req.user.role !== "owner")
    return res.send("Store owner only");
  next();
}

module.exports = {auth,adminOnly,ownerOnly};