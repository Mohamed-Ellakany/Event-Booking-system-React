import React from 'react';

import { Link} from 'react-router';
import { UserContext } from '../../Context/UserContext';
import { useContext } from 'react';
import { RoleContext } from '../../Context/RoleContext';


export default function Navbar()
{

  let {userToken , setUserToken} = useContext(UserContext)
let { userRole, setRole } = useContext(RoleContext);

  function SignOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    setUserToken(null)
    setRole('')
  
  }

return <>
<nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Eventify</Link>
        <div className="collapse navbar-collapse">
          {  userToken != null ? <>
          <ul className="navbar-nav ms-auto">
          {userRole === 'Admin'? <li className="nav-item">
              <Link className="nav-link" to="Admin">Admin</Link>
            </li> : ''}
           
            <li className="nav-item">
              <Link className="nav-link" to={'login'} onClick={SignOut}>SignOut</Link>
            </li>
          </ul>
         </>:<>
         <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="Login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Register">Register</Link>
            </li>
          </ul>

         </> }
 
        </div>
      </div>
    </nav>
</>

}
