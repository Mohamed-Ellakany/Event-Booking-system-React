import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router';



export default function Layout(){



  return <>
 <Navbar/>

<main className="min-vh-100">
   
      <Outlet></Outlet>
</main>

   <Footer/>  </> 
}
