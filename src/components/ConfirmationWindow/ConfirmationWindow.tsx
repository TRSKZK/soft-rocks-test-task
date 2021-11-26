import React, { useEffect } from 'react';
import './ConfirmationWindow.scss';

interface Props {
  userDeleted: boolean,
  closeModal: () => void;
}

export const ConfirmationWindow: React.FC<Props> = ({ userDeleted, closeModal }) => {
  useEffect(() => {
    const closeModalOnEsc = (event: KeyboardEvent): void => {
      event.preventDefault();
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', (event) => closeModalOnEsc(event))

  })
  return (
    <div className={userDeleted ? 'wrapp visible' : 'wrapp'  }>
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
