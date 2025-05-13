import React from 'react';
import styles from './Register.module.css';

import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router';

 
 let validationSchema = Yup.object({
 fullName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
 
   email: Yup.string().email('Invalid email').required('Required'),

   phoneNumber : Yup.string().required('Required') ,

   password : Yup.string().required('Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{9,}$/ , 'Password must be at least 9 characters and include uppercase, lowercase, number, and symbol')
 })

export default function Register()
{

let errors ;
let isLoading = false;
let navigate =useNavigate();

 async function submitRegister (values){
    isLoading =true;

  await axios.post('https://eventifybook-sys.runasp.net/Auth/register' , values).catch((err)=>{
    if (err.status === 409){
      errors = "this email is already exist"
    }
    if (err.status === 400){
      errors = "this invalid credentials "
    }
    })
        isLoading = false;
    if(!errors){
      navigate('/login')
    }

 }





let formik = useFormik({
  initialValues:{
          fullName: '',
          userName:'',
         email: '',
         phoneNumber: '',
         password:''
  }, validationSchema,
  onSubmit: submitRegister
  
})

 return <>
  <div className={`container py-5 `}>
      <div className="text-center mb-5">
        <h1>Welcome to Eventify</h1>
      </div>

      <div className={styles.formbox}>
     
        <h3 className="mb-4 text-center">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label>FullName</label>
            <input
              name="fullName" 
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="text"
              className="form-control"
              placeholder="Enter FullName "
            />
            {formik.errors.fullName && formik.touched.fullName ? <div className='alert mt-2 p-2 alert-danger '>{formik.errors.fullName}</div> : null}
            
          </div>
          <div className="mb-3">
            <label>userName</label>
            <input
              name="userName" 
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="text"
              className="form-control"
              placeholder="Enter userName "
            />
            {formik.errors.userName && formik.touched.userName ? <div className='alert mt-2 p-2 alert-danger '>{formik.errors.userName}</div> : null}
            
          </div>
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
            <label>Phone Number</label>
            <input
              name="phoneNumber" 
            value={formik.values.phoneNumber}
             onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber ? <div className='alert mt-2 p-2 alert-danger '>{formik.errors.phoneNumber}</div> : null}
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
      
        
                  {isLoading ?   <button  disabled  className="btn btn-custom d-flex justify-content-center align-items-center w-100"> <BallTriangle
                    height={20}
                    width={20}
                    radius={5}
                    color="#ffffff"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    /></button>:  <button  disabled={!(formik.isValid && formik.dirty)} type="submit"  className="btn btn-custom w-100">Register </button>
        } 
        </form>
       
      </div>
    </div>
  </>

}
