import React from 'react';
import { Link } from 'react-router-dom';
import './Contacts.css';
const Contacts = ({ contact }) => {
  return (
    <Link to={`/contacts/${contact.id}`} className='contact_item'>
      <div className='contact_card'>
        <div className="contact_image">
          <img src={contact.photoUrl} alt={contact.firstName.substring(0,15)} />
        </div>
        <div className="contact_details">
          <p className="contact_name">
            <span className="contact_Fname">{contact.firstName.substring(0, 15)}</span>
            <span className="contact_Lname">{contact.lastName.substring(0, 15)}</span>
          </p>
          <div className="contact_body">
            <p><i className="bi bi-envelope icon"></i>{contact.email.substring(0, 20)}</p>
            <p><i className="bi bi-telephone icon"></i>{contact.phone}</p>
            <p>
              {contact.status === 'Active' ? <i className="bi bi-check-circle icon"></i> : <i className="bi bi-x-circle icon"></i>}
              {contact.status}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Contacts;
