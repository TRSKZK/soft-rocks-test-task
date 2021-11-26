import React from 'react';
import { changeUser } from '../../api/users'
import { useState } from 'react';
import { User } from '../../typedefs';
import './ContactDetails.scss';

interface Props {
  selectedUser?: User | null,
  userId: number,
}

export const ContactDetails: React.FC<Props> = ({ selectedUser, userId }) => {
  const [name , setName] = useState(selectedUser?.name);
  const [email, setEmail] = useState(selectedUser?.email);
  const [phone, setPhone] = useState(selectedUser?.phone || 0);
  const [userName, setUserName] = useState(selectedUser?.userName || 'no user name');

  const hadleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    changeUser(userId, {name, email, phone, username: userName});

  }

  return (
    <div className="datails-container">
      {selectedUser && (
        <form
          className="edit-form"
          action="POST"
          onSubmit={hadleFormSubmit}
        >
          <div>
            <label htmlFor="name">
              Name:
              <input
                name="name"
                className="editable-field"
                value={name}
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="email">
              Email:
              <input
                name="email"
                className="editable-field"
                value={email}
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="phone">
              Phone:
              <input
                name="phone"
                className="editable-field"
                value={phone}
                type="tel"
                onChange={(event) => setPhone(Number(event.target.value))}
              />
            </label>
          </div>

          <div>
            <label htmlFor="user-name">
              User name:
              <input
                name="user-name"
                className="editable-field"
                value={userName}
                type="tel"
                onChange={(event) => setUserName(event.target.value)}
              />
            </label>
          </div>
          <button type="submit">
            Change user
          </button>
        </form>
      )}
    </div>
  )
};
