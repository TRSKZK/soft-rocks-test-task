import React from 'react';
import { changeUser } from '../../api/users'
import { useState } from 'react';
import { User, CachedUser } from '../../typedefs';
import './ContactDetails.scss';
import { useEffect } from 'react';

interface Props {
  selectedUser?: User | null,
  userId: number,
}

export const ContactDetails: React.FC<Props> = ({ selectedUser, userId }) => {
  const [name , setName] = useState(selectedUser?.name);
  const [email, setEmail] = useState(selectedUser?.email);
  const [phone, setPhone] = useState(selectedUser?.phone || 'not assigned');
  const [userName, setUserName] = useState(selectedUser?.userName || 'no user name');
  const [cachedUser, setCachedUser] = useState<CachedUser | null>(null);
  const [isErrorVisible, setIsErrorVsisble] = useState(false);

  useEffect(() => {
    setCachedUser({
      cachedName: selectedUser?.name,
      cachedEmail: selectedUser?.email,
      cachedPhone: selectedUser?.phone,
      cachedUserName: selectedUser?.userName,
    });

    return () => {
      setCachedUser(null);
    }
  }, [])

  const hadleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      changeUser(userId, {name, email, phone, username: userName});
    } catch (eror) {
      setIsErrorVsisble(true)
    }
  }

  return (
    <div className="datails-container">
      {selectedUser && (
        <form
          className="edit-form"
          action="POST"
          onSubmit={hadleFormSubmit}
        >
          <div className="edit-form__item">
            <label htmlFor="name">
              Name:
              {' '}
              <input
                required
                name="name"
                className="editable-field"
                value={name}
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <div className="edit-form__buttons-container">
              <button
                type='button'
                onClick={() => setName('')}
              >
                clear this field
              </button>

              <button
                type='button'
                onClick={() => setName(cachedUser?.cachedName)}
              >
                Back Button
              </button>
            </div>

          </div>

          <div className="edit-form__item">
            <label htmlFor="email">
              Email:
              {' '}
              <input
                required
                name="email"
                className="editable-field"
                value={email}
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div className="edit-form__buttons-container">
              <button
                type='button'
                onClick={() => setEmail('')}
              >
                clear this field
              </button>

              <button
                type='button'
                onClick={() => setEmail(cachedUser?.cachedEmail)}
              >
                Back Button
              </button>
            </div>

          </div>

          <div className="edit-form__item">
            <label htmlFor="phone">
              Phone:
              {' '}
              <input
                required
                name="phone"
                className="editable-field"
                value={phone}
                type="tel"
                onChange={(event) => setPhone(Number(event.target.value))}
              />
            </label>
            <div className="edit-form__buttons-container">
              <button
                type='button'
                onClick={() => setPhone('')}
              >
                clear this field
              </button>

              <button
                type='button'
                onClick={() => setPhone(cachedUser?.cachedPhone || 'not assigned')}
              >
                Back Button
              </button>
            </div>
          </div>

          <div className="edit-form__item">
            <label htmlFor="user-name">
              User name:
              {' '}
              <input
                required
                name="user-name"
                className="editable-field"
                value={userName}
                type="tel"
                onChange={(event) => setUserName(event.target.value)}
              />
            </label>
            <div className="edit-form__buttons-container">
              <button
                type='button'
                onClick={() => setUserName('')}
              >
                clear this field
              </button>

              <button
                type='button'
                onClick={() => setUserName(cachedUser?.cachedUserName || 'no user name')}
              >
                Back Button
              </button>
            </div>

          </div>
          <button type="submit">
            Submit Changes
          </button>
        </form>
      )}
    </div>
  )
};
