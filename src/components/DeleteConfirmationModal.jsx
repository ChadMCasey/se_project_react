import React from "react";

const DeleteConfirmationModal = () => {
  return (
    <div className="modal delete-confirm-modal">
      <div className="modal__container">
        <h2 className="modal__heading">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button className="modal__delete">Yes, delete item</button>
        <button className="modal__cancel">Cancel</button>
        <button className="modal__close"></button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
