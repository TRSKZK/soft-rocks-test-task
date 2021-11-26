import React from 'react';
import { useState, useCallback } from 'react';
import { Route, Routes } from 'react-router';
import { User } from './typedefs';
import './App.scss';
import ContactDetails from './components/ContactDetails';
import Contacts from './components/Contacts';

const  App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>();

  const handleUserIdChange = useCallback((value: number) => {
    setUserId(value)
  }, []);

  const passSelectedUser = useCallback((value: User) => {
    setSelectedUser(value);
  }, []);

  console.log(userId)

  return (
    <Routes>
       <Route
         path="/"
         element={
          <Contacts
            handleUserIdChange={handleUserIdChange}
            passSelectedUser={passSelectedUser}
          />
        }
       />
       <Route
         path={`/details/${userId}`}
         element={
          <ContactDetails
            userId={userId}
            selectedUser={selectedUser}
          />
        }
       />
    </Routes>
  )
};

export default App;
