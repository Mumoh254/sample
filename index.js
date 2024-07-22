const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
//express  object
const  app  =  express();

app.use(express.json())

const userSchema  =  mongoose.Schema({
         name:  {
            type:  "string",
            required:[ true , "Name  is  mandatory"]
         },
         password:{
            type:  "string",
            required:[true , " password  is  mandatory"],
            min: 8,
            max: 22
         },
         email: {
            type:  "string",
            required:  [ true ,  "Email   is  required"],
            min: 7,
            max: 19
         }
})

const userModel = mongoose.model("users" , userSchema)

//register  a user 
app.post("/register" , ( req ,  res)=>{
     
    let  users =  req.body;
    //hashing  password
    bcrypt.genSalt( 10  , ( err , salt )=>{
        if (!err) {
             bcrypt.hash(users.password , salt , (  err , encryptedPass)=>{
                if ( !err) {
                    users.password  =  encryptedPass;
                    console.log(encryptedPass)
                   userModel.create(users)
                   .then((user)=>{
                    console.log( user )
                    res.send({
                        message: "  user  created"
                    })
                   })
                   .catch((err)=>{
                    console.log(  err )
                   })
                } else  {
                    console.log( err)
                }
             })
        }  else  {
            console.log(  err )
        }
    })
    console.log(" endpoint  post  working")
})
//login  endpoint  
app.post("/login"  , (  req ,  res)=>{
     let userCred  =  req.body;
     //checking  if  user  exist  in  the  database

     userModel.findOne({email: userCred.email})
     .then((user)=>{
        console.log(user)
         
        if ( user!=null)  {
            bcrypt.compare(userCred.password , user.password , (err , result)=>{
                if (result == true) {

                  jwt.sign({email: userCred.email , }, "akiaiosfodnn7techerr@npmxServe",  (err , token)=>{
                    if (!err){

                        res.send({token:token})
                        console.log(token)
                       
                        
                    } else {
                        console.log( err)
                        res.send({
                            message: "wrong  authentication "
                        })
                    }
                  })
                }  else  {
                    console.log(  err)
                }
            })
        }
     
     })   
     .catch((err)=>{
        console.log(  err )
     })
    console.log(  "  endpoint  is  working")
})

//middle  ware
function middleWare (  req  ,  res  ,  next)  {

    //  authentication  and   authorization  
    console.log("authentication")
    console.log(req.headers)
    let  token = req.headers.authorization.split(" ")[1]
    //verify token
    jwt.verify(token , "akiaiosfodnn7techerr@npmxServe" , ( err ,  data)=>{
        if  (!err)  {

            console.log({message: "no  err token  signed  inn"})
            next()

        }  else {

            console.log( err) 
            res.status(404).send({message: "some  error  happened "})
            res.status().send({
                message: " some  issues  while  creating  token  please  try  again  some  time "

            })
        }
    })
} 
//only  authorized  user  will  access this  endpoint 
app.get("/v2carmakesv2024"  , middleWare  ,  (req ,  res)=>{
  console.log({
    message: "passed  through  authentication function"
  })

  res.send({
   message: "authentication"
  })

})

//automotive  schema
const  autoSchema  =  mongoose.Schema({
    brand: {
        type: "string",
        required: true
    },
    model:{
        type: "string",
        required: true
    },
    year_of_manufacture:{
        type: "Number"
    },
    chassis_number:{
        type: "string"
    },
    gasoline_type: {
        type: "string",
        required: true
    },
    oil_type: {
        type: "string",
        required: true
    }
})

const autoModel  =  mongoose.model("auto-data" , autoSchema)

//reqister  product  data
app.get( "/carmakes/cfao" , middleWare , (  req ,  res)=>{
      
    
    res.send({
        message:  "  updating  car  makes "
    })


})  

//update  database

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
console.log("secret key")
console.log(secretKey);



//connecting  to  database
mongoose.connect("mongodb://localhost:27017/Automotive-Database")
.then((conn)=>{
    console.log("  connected  to  database   successfully")

})
.catch(( err)=>{
    console.log( err )
})


//creating  a  server  instance 
app.listen(  8000 ,  (  req ,  res)=>{
    console.log("  server  up  and  running ")
})