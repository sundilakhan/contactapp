import React, { useEffect, useState } from 'react';
import Contact from "./Contacts";
import './ContactsLists.css';
import './Contacts.css';
import { getContacts } from './api/ContactService';

const ContactsLists = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('https://your-backend.com/api/contacts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            } else {
                console.error('Failed to fetch contacts');
            }
        };

        fetchContacts();
    }, []);
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Contacts! Please add a new contact</div>}
            <ul className="contact_list">
                {data?.content?.length > 0 && data.content.map(contact => <Contact contact={contact} key={contact.id} />)}
            </ul>
            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className="pagination">
                    <button onClick={() => getAllContacts(currentPage - 1)} disabled={currentPage === 0}>&laquo;</button>
                    {data && [...Array(data.totalPages).keys()].map(page,index)=>
                        <button
                            onClick={() => getAllContacts(page)}
                            className={currentPage === page ? 'active' : ''}
                            key={page}
                        >
                            {page + 1}
                        </button>
                    )}
                    <button onClick={() => getAllContacts(currentPage + 1)} disabled={data.totalPages === currentPage + 1}>&raquo;</button>
                </div>
            }
        </main>
    );
};

export default ContactsLists;

