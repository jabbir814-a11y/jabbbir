const why = require("express");
const json = require("jsonwebtoken");

const apk = why();

const key = "secretkey";

function create(req, res, next) {

    const authheader = req.headers["authorization"];

    const token = authheader && authheader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Sorry, token required"
        });
    }

    try {

        const code = json.verify(token, key);

        req.user = code;

        next();

    } catch (error) {

        return res.status(403).json({
            message: "Invalid token"
        });

    }
}

apk.get("/profile", create, (req, res) => {

    res.json({
        message: "Welcome to your profile",
        user: req.user
    });

});
apk.post('/profile',(req,res)=>{
const{username,password}=req.body
if (username!=="abi" ||password!==1234){
return res.json({
message:"not welcome here"
})
}
const token=json.sign(
{
id:1,
username:username

},
key,{
expiresIn:"1h"
}
);
return res.json({
message:"okay get in man",
token:token
})
})


apk.listen(3000, () => {
    console.log("Server running on port 3000");
});