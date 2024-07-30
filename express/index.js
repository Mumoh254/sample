



const  express =  require('express');
const  cors   =   require('cors');
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
} , {timestamps:true});

const   productSchemas  =  ({

    brand: {
        type: "string"
    },
    model:{
        type:  "string"
    },
    color:{
        type: "string"
    }
    ,
    size: {
        type: ['string']
    }
    ,
    rating:{
        type:  Number
    },
    image: {
        type:  "string"
    },
    availability:  {
        type:  "string"
    }

},{timestamps: true});

const   productModel  =  mongoose.model("track"  , productSchemas)


const   userModel  = mongoose.model("users" , userSchema)

//creating  an  app  object
const  app  =  express();

//crosss  oringin   resource    sharing
app.use(cors());


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

  
 
   
    let   token  =  req.headers.authorization.split(" ")[1]
    console.log(`   this  is  my  ${token}`)

     console.log(  "  to0ken   authenticated")

    jwt.verify(  token , "secretkey" , (  err  , dataPass)=>{
        if (!err)  {

            console.log(  "token  has   been  verified")

            next()

        }   else  {
            console.log  (  err)
        }
    })


}


//  protected   endpoints

app.get("/nutrify/track"  , midlleAuthenticate ,    (   req  ,  res )=>{

       console.log(   "  protected   endpoint   working ");

       res.status(200).send  ({
        message:   "track    enpoint   workingg  ",
        status:(200),
        endpopint: ("/nutrify/track")
       })

     
});


app.get(  "/nutrify/put"   ,  midlleAuthenticate  ,  (  req  ,  res  )=>{


    res.send({
    
    })

    res.redirect("https://dev.to/sasandehghanian/create-read-update-delete-data-by-using-mongoose-nodejs-53l7")

    console.log(  "put  is   working")




})

//endpoint  to   update    a  product  in t he  database
app.




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