import React from 'react';
import { User } from '../../typedefs';
import './ContactDetails.scss';

interface Props {
  selectedUser?: User | null,
}

export const ContactDetails: React.FC<Props> = ({ selectedUser }) => {
  return (
    <div>
      <h1>contact details</h1>
      {selectedUser && (
        <div>
          <p>
            <b>User Name:</b>
            {' '}
            {selectedUser.name}
          </p>

          <p>
            <b>User Email:</b>
            {' '}
            {selectedUser.email}
          </p>

          <p>
            <b>User Phone:</b>
            {' '}
            {selectedUser.phone}
          </p>

          {selectedUser.userName && (
            <p>
            <b>Nick name:</b>
            {' '}
          </p>
          )}

          <p>
            <b>User Id:</b>
            {' '}
            {selectedUser.id}
          </p>
        </div>
      )}
    </div>
  )
};
