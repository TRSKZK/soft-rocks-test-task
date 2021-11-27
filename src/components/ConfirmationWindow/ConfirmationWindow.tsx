import React from 'react';
import './ConfirmationWindow.scss';

interface Props {
  userDeleted: boolean,
  closeModal: () => void;
}

export const ConfirmationWindow: React.FC<Props> = ({ userDeleted, closeModal }) => {

  return (
    <div
      id='modal'
      className={userDeleted ? 'wrapp visible' : 'wrapp'}
    >
      <p>You just deleted this contact</p>
      <div>
        <button
          type="button"
          onClick={closeModal}
        >
          Close Window
        </button>
      </div>
    </div>
  )
};
