import React from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => Promise<void>; // Update this to reflect an async function if needed
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
  const confirmDelete = () => {
    if (emailToDelete === userEmail) {
      onConfirmDelete();
      setIsOpen(false); // Close modal
    } else {
      // Inform user that the email doesn't match
      alert("Email does not match the logged-in user's email.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 ${!isOpen && "hidden"}`}
      style={{ backdropFilter: "blur(5px)" }} // Add this line
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
            onChange={(e) => setEmailToDelete(e.target.value)}
            className="border p-2 rounded w-full bg-slate-200 text-slate-700 border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
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
