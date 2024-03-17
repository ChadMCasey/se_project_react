import React from "react";
import "../blocks/Modal.css";
import "../blocks/DeleteModal.css";

const DeleteConfirmationModal = ({
  onClose,
  isLoading,
  activeModal,
  deleteCardCallback,
}) => {
  return (
    <div
      className={`modal ${
        activeModal === "delete-modal" && "modal_opened"
      } delete-modal`}
    >
      <div className="modal__container">
        <h2 className="modal__heading">
          Are you sure you want to delete this item?
        </h2>
        <h2 className="modal__heading">This action is irreversible.</h2>
        <button
          className="modal__delete"
          type="button"
          onClick={deleteCardCallback}
        >
          {isLoading ? "deleting..." : "Yes, delete item"}
        </button>
        <button className="modal__cancel" onClick={onClose}>
          Cancel
        </button>

        <button className="modal__close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
