import  {Link}   from  'react-router-dom'

function  Register  ()
{
    return(
        <div className="register">

            <form action="POST"   className="form">
                 
                 <div className="header">
                 <legend>Register  Here</legend>

                 </div>
             

             <div className="inp-fields">

                <div className="inp">
                     
                <label htmlFor="Name">Name</label>  <br />
                <input type="text"   placeholder="Enter   Name"/>

                </div>



                
                <div className="inp">
                     
                <label htmlFor="Name">Email</label>  <br />
                <input type="text"   placeholder="Enter   Email"/>

                </div>


                
                <div className="inp">
                     
                <label htmlFor="Name">City</label>  <br />
                <input type="text"   placeholder="Enter   City"/>

                </div>


                
                <div className="inp">
                     
                <label htmlFor="Name">Adress</label>  <br />
                <input type="Number"   placeholder="Enter   Adress"/>

                </div>


                
                <div className="inp">
                     
                <label htmlFor="Name">Age</label>  <br />
                <input type="Number"   placeholder="Enter   Age"/>

                </div>


                
                <div className="inp">
                     
                <label htmlFor="Name">DOB</label>  <br />
                <input type="date"   placeholder="Enter   Dob"/>

                </div>


                
                <div className="inp">
                     
                <label htmlFor="Name">Password</label>  <br />
                <input type="text"   placeholder="Enter   Password"/>

                </div>


                     
                <div className="inp">
                     
                <label htmlFor="Name">Confirm  Password</label>  <br />
                <input type="text"   placeholder="Confirm  Password"/>

                </div>
               

             </div>

             
             <div className="btns">

            <button  type="Next"   className="sub">Next</button>
             <button  type="cancel"  className="sub">Cancel</button>
             </div>

            </form>

        </div>
    )
}

export   default   Register;