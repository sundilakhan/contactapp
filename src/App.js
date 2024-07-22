import React, { useState, useEffect } from 'react';
import "./App.css";
import Header from "./Components/Header";
import ContactList from "./Components/ContactsLists";
import LogIn from  './Components/LoginRegister/LogIn';
import Register from './Components/LoginRegister/Register'; // Import Register component
import { getContacts } from './api/ContactService';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getAllContacts();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && <Header toggleModal={() => {}} nbOfContacts={data.totalElements} />}
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/contacts' : '/login'} />} />
            <Route path="/login" element={<LogIn setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={isAuthenticated ? <ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;