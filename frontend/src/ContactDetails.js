import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact } from '../api/ContactService';

const ContactDetails = ({ updateContact, updateImage }) => {
    const inputRef = useRef();
    const fileRef = useRef();
    const [contact, setContact] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        status: '',
        photoUrl: ''
    });
    const [file, setFile] = useState(null);

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setContact(data);
        } catch (error) {
            console.log(error);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', contact.id);
            await updateImage(formData);
            setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContact(id);
    }, [id]);

    const handleNewContact = async (event) => {
        event.preventDefault();
        await updateContact(contact);
    };

    const onInputChange = (event) => {
       setContact({ ...contact, [event.target.name]: event.target.value});
    };

    const onUpdateContact = async (event) =>{
        event.preventDefault();
        updateContact(contact);
         fetchContact(id);
    }

    return (
        <>
            <Link to='/contacts' className='link'><i className='bi bi-arrow-left'></i> Back to List</Link>
            <div className='profile'>
                <div className='profile_image'>
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.fname} ${contact.lname}`} />
                    <div className='profile_metadata'>
                        <p className='profile_name'>{contact.fname} {contact.lname}</p>
                        <p className='profile_muted'>JPG, GIF, or PNG. Max size of 10MB</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile_settings'>
                    <form onSubmit={onUpdateContact}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">First Name</span>
                                <input type="text" defaultValue={contact.fname} onChange={onInputChange} name="fname" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Last Name</span>
                                <input type="text" defaultValue={contact.lname} onChange={onInputChange} name="lname" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="email" defaultValue={contact.email} onChange={onInputChange} name="email" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" defaultValue={contact.phone} onChange={onInputChange} name="phone" required />
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" defaultValue={contact.status} onChange={onInputChange} name="status" required />
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name="photo" />
                            </div>
                        </div>
                        <div className="form_footer">
                            <button type="button" className="btn btn-danger" onClick={() => window.history.back()}>Cancel</button>
                            <button type="submit" className="btn">Save</button>
                        </div>
                    </form>
                    <form style={{ display: 'none' }}>
                        <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name='file' accept='image/*' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactDetails;
