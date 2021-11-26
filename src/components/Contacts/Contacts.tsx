import React, { useState, useEffect } from 'react';
import ContactAddForm from '../ContactAddForm';
import { NavLink } from 'react-router-dom';
import './Contacts.scss';
import { User } from '../../typedefs';
import { loadUsers, deleteUser } from '../../api/users';
import { useCallback } from 'react';

interface Props {
  handleUserIdChange: (value: number) => void,
  passSelectedUser: (value: User) => void,
}

export const Contacts: React.FC<Props> = ({ handleUserIdChange, passSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsersData = async () => {
    const users = await loadUsers();

    setUsers(users);
  }

  useEffect(() => {

    getUsersData();


  },[]);

  const updateUsers = useCallback((users: User[]) => {
    setUsers(users);
    
  }, []);

  const hanleUserDeletion = async (userId: number) => {
    const result = await deleteUser(userId);

    if (result) {
      getUsersData();
    }

  }

  return (
    <div className="contacts-container">
      <h1>Contacts Page</h1>
      <ContactAddForm
        updateUsers={updateUsers}
      />

      <div>
        <ul className="contacts-list">
          {users.length && users.map(user => (
            <li
              className="contacts-list__card"
              key={user.id}
              >
              <p>
                <strong>Contact name:</strong>
                {' '}
                {user.name}
              </p>
              <div className="contacts-list__buttons-container">
                <NavLink
                  className="button detail-button"
                  to={`/details/${user.id}`}
                  onClick={() => {
                    handleUserIdChange(user.id);
                    passSelectedUser(user);
                  }}
                >
                  Details
                </NavLink>

                <button
                  className="button delete-button"
                  onClick={() => hanleUserDeletion(user.id)}
                >
                  Delete Contact
                </button>

              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
