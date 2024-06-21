const express = require("express");
// const session = require('express-session');
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");

app.use(express.json());

const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./models/reg");

const static_path = path.join(__dirname, "../public");
const path2 = path.join(__dirname,"/views");
console.log(path2);
app.use(express.static(static_path));
app.set("view engine", "hbs"); 
app.set("views", path2); 


app.get("/", (req,res) =>{
    res.render("index")
});

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/getNews",require("./controllers/getNews"));

//page after login
app.get("/index", (req,res) =>{
    res.render("index")
});

app.get("/loggedIn", (req,res) =>{
    res.render("loggedIn")
});

app.post("/signup" , async (req,res)=>{
    try {
        const { firstname,lastname,email,mobileNumber,username,password,confirmPassword,country} = req.body;
        const collections = await Register.find({}).lean();
        for (const collection of collections) {
            if (collection.email === email) {
                return res.json({ txt: 'This email is already taken, try with another!' });
            }
            if (collection.phone === mobileNumber) {
                return res.json({ txt: 'This mobile number is already taken, try with another!' });
            }
            if (collection.username === username) {
                return res.json({ txt: 'This username is already taken, try with another!' });
            }
        }
        const registeruser = new Register({
            firstname,
            lastname,
            email,
            phone:req.body.mobileNumber,
            country,
            username,
            password,
            confirmpassword:req.body.confirmPassword,
        })
        const data = await registeruser.save();
        res.json({txt:'Sign up succesfull, Try to log in now'});
    } catch (error) {
        console.log(error);
        res.json({txt:"Internal server error"})
    }
})
app.post("/login" , async(req,res) => {
    try {
        const { username, password } = req.body;
        const user = await Register.findOne({username});
        const collections = await Register.find({}).lean();
        var fname,lname;
        for (const collection of collections) {
            if (collection.username === username) {
                fname = collection.firstname;
                lname = collection.lastname;
            }
        }
        for(var i=0;i<1;i++)
        {
            if (!user) {
                return res.json({ txt: "Username not found" });
            }
            if (user.password !== password) {
                return res.json({ txt: "Invalid password" });
            } 
            
        }
        // req.session.user = user;
        // req.session.fname = fname;
        // req.session.lname = lname;
        res.json({txt:"sucess"})
    } catch (err) {
        console.error(err);
        res.json({ txt: "Internal server error" });
    }
});




app.listen(port, () =>{
    console.log(`server is ok on ${port}`);
})