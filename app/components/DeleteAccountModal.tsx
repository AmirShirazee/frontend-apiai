import React, { useState } from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => Promise<void>;
  emailToDelete: string;
  setEmailToDelete: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  setIsOpen,
  onConfirmDelete,
  emailToDelete,
  setEmailToDelete,
  userEmail,
}) => {
  // State for managing error messages
  const [errorMessage, setErrorMessage] = useState<string>("");

  const confirmDelete = async () => {
    if (emailToDelete === userEmail) {
      try {
        await onConfirmDelete(); // Assuming this might be an async operation
        setIsOpen(false); // Close modal
      } catch (error) {
        // Handle any errors that might occur during deletion
        setErrorMessage("Failed to delete account. Please try again.");
      }
    } else {
      // Set user-friendly error message
      setErrorMessage("Email does not match the logged-in user's email.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 ${!isOpen && "hidden"}`}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="bg-slate-800 p-4 rounded-lg shadow-xl max-w-md mx-auto">
          <h2 className="text-xl text-slate-200 font-bold mb-4">
            Confirm Account Deletion
          </h2>
          <p>Please enter your email to confirm:</p>
          <input
            type="email"
            value={emailToDelete}
            onChange={(e) => {
              setEmailToDelete(e.target.value);
              // Reset error message on input change
              setErrorMessage("");
            }}
            className="border p-2 rounded w-full bg-slate-200 text-slate-700 border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <div className="flex justify-end mt-4 space-x-2">
            <button className="btn border" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              className="btn bg-red-600 text-white"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
