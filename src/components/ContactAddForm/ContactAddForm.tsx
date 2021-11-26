import React, {useState} from 'react';
import { User } from '../../typedefs';
import { addUser, loadUsers } from '../../api/users';
import './ContactAddForm.scss';

interface Props {
  updateUsers: (users: User[]) => void,
}

export const ContactAddForm: React.FC<Props> = ({updateUsers}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const clearForm = () => {
    setName('');
    setUserName('');
    setEmail('');
    setPhone('');
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newUser = await addUser({name, userName, email});

    if (newUser) {
      const users = await loadUsers();
      updateUsers(users)
    }

    clearForm();
  }
  return (
    <form
      className="form"
      action="POST"
      onSubmit={handleFormSubmit}
    >
      <fieldset className="form__fieldset">
        <legend>Please add a new user</legend>
        <label
          className="form__label"
          htmlFor="name">
          <div className="form__group">
            <input
              placeholder="Name"
              className="form__input"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </label>

        <label
          className="form__label"
          htmlFor="user-name"
        >
          <div className="form__group">
            <input
              placeholder="User Name"
              className="form__input"
              name="user-name"
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
        </label>

        <label htmlFor="email">
          <div className="form__group">
            <input
              className="form__input"
              placeholder="example@email.com"
              name="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>

        <label htmlFor="phone">
          <div className="form__group">
            <input
              className="form__input"
              placeholder="+380(XX)XXX-XX-XX"
              name="phone"
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </label>

        <button type="submit">
          Add a new user
        </button>
      </fieldset>
    </form>
  )
};
