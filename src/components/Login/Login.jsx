import React, { useContext, useState } from 'react';
import styles from './Login.module.css';

import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router';
import {UserContext} from '../../Context/UserContext'
import { RoleContext } from '../../Context/RoleContext';

 let validationSchema = Yup.object({
 
   email: Yup.string().email('Invalid email').required('Required'),


   password : Yup.string().required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{9,}$/ , 'Password must be at least 9 characters and include uppercase, lowercase, number, and symbol')
 })


export default function Login()
{
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState('');

  let {setRole} = useContext(RoleContext)
let {setUserToken} = useContext(UserContext)

let navigate = useNavigate();

 let submitLogin =async function (values){

  setIsLoading (true);

  let response = await axios.post('https://eventifybook-sys.runasp.net/Auth/Login' , values).catch((err)=>{
 
    
    if (err.status === 400 || err.status === 404){
      setErrors("this invalid credentials ") ;
       setIsLoading (false);
       }
      
   
    })
    if (response.status === 200 || response.status === 201){
      localStorage.setItem('userToken' ,response.data.token )
      localStorage.setItem('userRole' ,response.data.role )
      setUserToken(response.data.token)
      setRole(response.data.role)
      
      setIsLoading(false)
      navigate('/');
   
 }
 }

let formik = useFormik({
  initialValues:{
         email: '',
         password:''
  }, validationSchema,
  onSubmit: submitLogin
  
})

 return <>
  <div className={`container py-5 `}>
      <div className="text-center mb-5">
        <h1>Welcome to Eventify</h1>
      </div>

      <div className={styles.formbox}>
     
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={formik.handleSubmit}>

          <div className="mb-3"> 
            <label>Email address</label>
            <input
              name="email" 
            value={formik.values.email}
             onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
              {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger '>{formik.errors.email}</div> : null}
          </div>
       
          <div className="mb-3">
            <label>Password</label>
            <input
                 name="password" 
            value={formik.values.password}
             onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
             {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger '>{formik.errors.password}</div> : null}
          </div>

           {errors ?<span className='alert alert-danger m-2 p-2'>{errors}</span>:'' }
      
          {isLoading ?   <button  disabled  className="btn btn-custom w-100"> <BallTriangle
            height={20}
            width={20}
            radius={5}
            color="#ffffff"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            /></button>:  <button  disabled={!(formik.isValid && formik.dirty)} type="submit"  className="btn btn-custom w-100">Login </button>
} 
        </form>
      
      </div>
    </div>
  </>

}
