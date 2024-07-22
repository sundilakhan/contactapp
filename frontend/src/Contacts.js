import React from 'react';
import { Link } from 'react-router-dom';
import './contact.css';

const Contacts = ({ contact }) => {
  return (
    <Link to={`/contacts/${contact.id}`} className='contact-item'>
      <div className='contact-header'>
        <div className='contact-image'>
          <img
            src={contact.photoUrl}
            alt={contact.Fname ? contact.Fname.substring(0, 15) : 'No Name'}
          />
        </div>
        <div className='contact-details'>
          <p className='contact-fname'>
            {contact.Fname ? contact.Fname.substring(0, 15) : 'No First Name'}
          </p>
          <p className='contact-lname'>
            {contact.Lname ? contact.Lname.substring(0, 15) : 'No Last Name'}
          </p>
        </div>
      </div>
      <div className='contact-body'>
        <p>
          <i className='bi bi-envelope'></i>
          {contact.email ? contact.email.substring(0, 20) : 'No Email'}
        </p>
        <p>
          <i className='bi bi-telephone'></i>
          {contact.phone ? contact.phone : 'No Phone'}
        </p>
        <p>
          {contact.status === 'Active' ? (
            <i className='bi bi-check-circle'></i>
          ) : (
            <i className='bi bi-x-circle'></i>
          )}
          {contact.status}
        </p>
      </div>
    </Link>
  );
};

export default Contacts;