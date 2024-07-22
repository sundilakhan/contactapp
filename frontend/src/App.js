import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './index';
import Register from './register';
import Login from './Login';
import { getContacts } from "../../src/api/ContactService";
import Header from "../../src/Components/Header";
import ContactList from "./ContactList";
import './App.css';

const App = () => {
    const modalRef = useRef();
     const fileRef = useRef();
    const [data, setData] = useState({});
    const [file, setFile]= useState(undefined);
    const [currentPage, setCurrentPage] = useState(0);
    const [values,setValues]=useState({
    fname: '',
    lname:'',
    email:'',
    phone:'',
    status:'',
    });

    const getAllContacts = async (page = 0, size = 10) => {
        try {
            setCurrentPage(page);
            const response = await getContacts(page, size);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

const onChange=(event)={
setValues({...values, [event.target.name]: event.target.value});
 console.log(values);
};

const handleNewContact = async (event) => {
event.preventDefault();
try{
const { data }= await saveContact(values);
const formData = new FormData();
formData.append('file', file,file.name);
formData.append('id', data.id);
const {data: photoUrl } = await updatePhoto(formData);
toggleModal(false);
setFile(undefined);
fileRef.current.value = null;
setValues({
    fname: '',
    lname:'',
    email:'',
    phone:'',
    status:'',
})
 getAllContacts();

}catch(error){
console.log(error);
}
};

 const updateContact = async (contact) => {
try{
const {data}= await saveContact(contact);
}catch(error){
  console.log(error);
  }
    };

const updateImage = async (formData) => {
try{
const {data:photoUrl}= await updatePhoto(formData);
}catch(error){
 console.log(error);
 }
    };

    const toggleModal = show => show? modalRef.current.showModal(): modalRef.current.close();

    useEffect(() => {
        getAllContacts();
    }, []);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
                    <Route path="/contacts/:id" element={<ContactDetails updateContact={updateContact} updateImage={updateImage} />} />
                </Routes>
                <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
                <main className='main'>
                    <div className='container'>
                        {/* Other content can go here */}
                    </div>
                </main>
            </div>
        </Router>


{/*Modal*/}
<dialog ref={modalRef} className="modal" id="modal">
<div className="modal_header">
<h3>New Contact</h3>
<i onClick=()=> {toggleModal(false)} className="bi bi-x-lg"></i>
</div>
<div className="divider"></div>
<div className="modal_body">
    <form onSubmit={handleNewContact}>
        <div className="user-details">
            <div className="input-box">
                <span className="details"> First Name</span>
                <input type="text" value={values.fname} onChange={onChange} name="fname" required />
            </div>
            <div className="input-box">
                <span className="details"> Last Name</span>
                <input type="text" value={values.lname} onChange={onChange} name="lname" required />
            </div>
            <div className="input-box">
                <span className="details">Email</span>
                <input type="email" value={values.email} onChange={onChange} name="email" required />
            </div>
            <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name="phone" required />
            </div>
            <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name="status" required />
            </div>
            <div className="file-input">
            <span className="details">Profile Photo</span>
            <input type="file" onChange={(event)=> {setFile(event.target.files[0])}} ref={fileRef} name="photo" required />
        </div>
        </div>
       <div className="form_footer">
        <button onClick=()=> {toggleModal(false)} type="button" className="btn btn-danger">Cancel</button>
        <button type="submit" className="btn">Save</button>
       </div>
    </form>
</div>
</dialog>



    );
};

export default App;
