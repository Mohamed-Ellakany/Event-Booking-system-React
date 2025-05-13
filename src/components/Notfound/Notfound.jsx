import React from 'react';
import styles from './Notfound.module.css';


export default function Notfound(){

  return <>
  <div  className={`d-flex justify-content-center align-items-center ${styles.h100vh}`}>
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f8f8"/>
  <text x="50%" y="40%" text-anchor="middle" font-size="64" fill="#333" font-family="Arial, sans-serif">404</text>
  <text x="50%" y="55%" text-anchor="middle" font-size="24" fill="#666" font-family="Arial, sans-serif">Page Not Found</text>
  <circle cx="200" cy="220" r="30" fill="#ddd"/>
  <path d="M180 215 L200 235 L220 215" stroke="#999" stroke-width="4" fill="none"/>
</svg>

</div>

  </>
};
