const express = require("express")
const app = express()
const path = require('path')
const hbs = require("hbs")
const bcrypt = require("bcryptjs")

require("./db/conn")
const Register = require("./models/registers")
const {json} = require("express")
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,'../public')
const templates_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",templates_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/register",async(req,res)=>{
    try{

        const password = req.body.password
        const cpassword = req.body.confirmpassword
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword
            })
            
            // password hash
            

            const registered = await registerEmployee.save()
            res.status(201).render("index")
        }else{
            res.send("passwords are not matching")
        }
        

    }catch(error){
        res.status(400).send("------Error Occured----- Please fill form completely")
    }
})  

//login check

app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        const useremail = await Register.findOne({email:email})
 
        // const isMatch = await bcrypt.compare(password , username.password)

        if(useremail.password===password)
            res.status(201).render("index")
        else
            res.send("Invalid Credentials")
    }catch{
        res.status(400).send("invalid Credentials")
    }
})


app.listen(port,()=>{
    console.log(`Server is Running at port ${port}` )
})