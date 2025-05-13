import React from 'react';
import styles from './Cover.module.css';


export default function Cover(){
  return <>
  
  <header className={styles.Cover}>
      <div className="cover-overlay">
        <h1 className="display-4 mb-4">Book Your Event Tickets</h1> 
        <span
        className="btn btn-custom btn-lg pointer"
      >
        <i className="fas fa-ticket-alt"></i> Booking Now
      </span>
      </div>
      
    </header>
  </>
}
