

const  express =  require('express');

const   bcrypt  =  require("bcrypt");
const  mongoose  =  require('mongoose');
const   jwt   =  require('jsonwebtoken');



const  userSchema  =  mongoose.Schema({
    name:{
        type: "string"

    },

    age: {
        type: "number"
    },
    password:  {
        type:  "string"
    },
    email: {
        type:  "string"
    }
})


const   userModel  = mongoose.model("users" , userSchema)

//creating  an  app  object
const  app  =  express();


//extracting  data  chunk  by  chunk
app.use(express.json());


//register   endpoint  

app.post("/nutrify/register"  ,  (  req  ,  res)=>{

    let  user  =  req.body;

    //encrypt  user   password  and   store  it  in  the  database 

    bcrypt.genSalt(  10  ,  (  error ,   salt)=>{
        if(   error   ==  null)  {

            bcrypt.hash(  user.password  ,   salt  ,  (  err  ,   encryptedPass)=>{
                if  (!err)  {

                    user.password  =  encryptedPass;
                    console.log(user)
                  
                    userModel.create(user)
                    .then((data)=>{

                       res.status(200).send({
                        "message  " :  "Registration  successful"
                       })

                    })


                    .catch((err)=>{
                        console.log(err)
                    })




                }   else  {
                    console.log(  err)
                }
            })

        }   else  {
            console.log(  error)
        }
    })


});

//login  endpoint  
app.post("/nutrify/login" ,  (  req  ,  res )=>{

    let  userCred  =  req.body;


    userModel.findOne({email: userCred.email})
    .then((user)=>{
        console.log("login   endpoind  working")
      

        if ( user!=null){

            bcrypt.compare(userCred.password , user.password , ( err  , result)=>{
                if  (!err){


                    if (result ==  true)  {

                      jwt.sign({email:   userCred.email} ,   "secretkey"  ,  (  err  ,  token)=>{
                        if  (!err)  {

                            res.status(200).send({
                                token:token ,
                                message:  "login  successful",
                                user:  userCred.email,
                                
                            })

                            console.log(token)

                        }   else  {
                            console.log(err)
                        }
                      })

                       } 

                   

                }   else  {
                    console.log( err)
                }
            })

        }   else  {

            res.status(400).send({
                Eror: "Wrong   Authentication",
                message:  "Please  Try   again",
                status:(400)

            })
            
        }
    })
    .catch((err)=>{
        console.log(err)
    })



});


//  middle  ware   functionn  for   authentiocation  
function midlleAuthenticate  (  req  ,  res ,  next)  
{

    console.log(  "  request  headers")
    console.log(req.headers)
    console.log(  req.headers.authorization)
    let   token  =  req.headers.authorization.split("")[1]

    jwt.verify(  token , "secretkey" , (  err  , dataPass)=>{
        if (!err)  {

            res.send({
                message:  "   am  an   authenticated   endpoint  "
            })

        }   else  {
            console.log  (  err)
        }
    })


}


//  protected   endpoints

app.get("/nutrify/track"  , midlleAuthenticate ,    (   req  ,  res )=>{
       console.log(   "  protected   endpoint   working ");

     
});





//connecting  to  database  
mongoose.connect("mongodb://localhost:27017/nutrify")
.then((reolved)=>{
    console.log(  "databse  connection  succesful")
})
.catch((err)=>{
    console.log(  err)
})


//creating  a  server  instance 
app.listen(  8000  ,  (  req ,  res)=>{
    console.log(  "  server   running  on  port   8000");
});
