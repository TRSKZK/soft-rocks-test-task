import React, {useState} from 'react';
import { User } from '../../typedefs';
import { addUser, loadUsers } from '../../api/users';
import './ContactAddForm.scss';
import { useEffect } from 'react';
import { useCallback } from 'react';

interface Props {
  updateUsers: (users: User[]) => void,
}

export const ContactAddForm: React.FC<Props> = ({updateUsers}) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameIsNotCorrect, setNameIsNotCorrect] = useState(false);
  const [emailIsNotCorrect, setEmailIsNotCorrect] = useState(false);
  const [phoneIsNotCorrect, setPhoneIsNotCorrect] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  const clearForm = () => {
    setName('');
    setUserName('');
    setEmail('');
    setPhone('');
  }

  const checkFormInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\+?3?8?(0[\s.-]\d{2}[\s.-]\d{3}[\s.-]\d{2}[\s.-]\d{2})$/;

    switch (event.target.name) {
      case 'name': {
        if (!name.match(nameRegex)) {
          setNameIsNotCorrect(true);
        }
        break;
      }
      case 'email': {
        if (!email.match(emailRegex)) {
          setEmailIsNotCorrect(true);
        }
        break;
      }
      case 'phone': {
        if (!phone.match(phoneRegex)) {
          setPhoneIsNotCorrect(true);
        }
        break;
      }
      default: {
        setEmailIsNotCorrect(false);
        setNameIsNotCorrect(false);
        setPhoneIsNotCorrect(false);
        return;
      }
    }
  }

  const isSumbitDisabled = useCallback(() => {
    return name && phone && email && !nameIsNotCorrect 
      && !phoneIsNotCorrect && !emailIsNotCorrect;
  },[emailIsNotCorrect,email, name, phone, phoneIsNotCorrect, nameIsNotCorrect])
  

  useEffect(()=> {
    const res = isSumbitDisabled()
    setCanSubmit(Boolean(res));

  },[isSumbitDisabled]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let newUser: User | null = null;

    if (canSubmit) {
      newUser = await addUser({name, userName, email});
      clearForm();
    }

    if (newUser) {
      const users = await loadUsers();
      updateUsers(users)
    }
  }

  return (
    <form
      className="form"
      action="POST"
      onSubmit={handleFormSubmit}
    >
      <fieldset className="form__fieldset">
        <legend>Please add a new user</legend>
        {nameIsNotCorrect && (
          <span className="error-message">
            name in not correct! only letters are accepteble
          </span>
        )}
        <label
          className="form__label"
          htmlFor="name">
          <div className="form__group">
            <input
              autoComplete="off"
              placeholder="Name"
              className="form__input"
              name="name"
              type="text"
              value={name}
              onBlur={checkFormInputs}
              onChange={(event) => {
                setName(event.target.value);
                setNameIsNotCorrect(false)
              }}
            />
          </div>
        </label>

        <label
          className="form__label"
          htmlFor="user-name"
        >
          <div className="form__group">
            <input
              autoComplete="off"
              placeholder="User Name"
              className="form__input"
              name="user-name"
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
        </label>
        {emailIsNotCorrect && (
          <span className="error-message">
            email in not correct! please enter valid email
          </span>
        )}
        <label htmlFor="email">
          <div className="form__group">
            <input
              autoComplete="off"
              className="form__input"
              placeholder="example@email.com"
              name="email"
              type="text"
              value={email}
              onBlur={checkFormInputs}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailIsNotCorrect(false);
              }}
            />
          </div>
        </label>
        {phoneIsNotCorrect && (
          <span className="error-message">
            phone is not correct!
          </span>
        )}
        <label htmlFor="phone">
          <div className="form__group">
            <input
              autoComplete="off"
              className="form__input"
              placeholder="+380-XX-XXX-XX-XX"
              name="phone"
              type="text"
              value={phone}
              onBlur={checkFormInputs}
              onChange={(event) => {
                setPhone(event.target.value);
                setPhoneIsNotCorrect(false);
              }}
            />
          </div>
        </label>

        <button
          disabled={!canSubmit}
          type="submit"
        >
          Add a new user
        </button>
      </fieldset>
    </form>
  )
};
