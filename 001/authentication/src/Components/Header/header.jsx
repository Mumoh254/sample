
  function  Header  ()
  {
    return(
        <div   className="header">

            <header>
                <div className="logo">
                    <p>Concatenated  </p>
                    <p><span>Group</span></p>
                </div>
            </header>


            <nav  className="navigation">

                <ol  className="nav-links">

                    <li  className="nav-link"><a href="">Home</a></li>
                    <li  className="nav-link"><a href="">About</a></li>
                    <li  className="nav-link">  <a href="">Services</a></li>
                    <li  className="nav-link">  <a href="">Blog</a></li>
                    <input type="text"  className="serch" placeholder="Search"/>
                
                </ol>

            </nav>


        </div>
    )
  }
  export   default  Header;