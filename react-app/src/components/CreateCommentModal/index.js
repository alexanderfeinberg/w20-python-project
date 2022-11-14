import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateCommentForm from './CreateCommentForm';
import './CreateCommentForm';

function CreateCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='Create_Comment_Button' onClick={() => setShowModal(true)}>Respond</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCommentForm />
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;