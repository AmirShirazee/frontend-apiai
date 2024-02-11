'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import getUser from '@/utils/getUser';
import DeleteAccountModal from '@/app/components/DeleteAccountModal';

export default function AccountPanel() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState('');
  const { userData, isLoading, error } = getUser();

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    }

    window.addEventListener('keydown', handleEscapeKey);

    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/account/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToDelete }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error deleting account');
      await signOut();
    } catch (error) {
      console.error('Failed to delete the account:', error);
    }
  };

  const redirectToChangePassword = () => {
    router.push('/change-password');
  };

  const redirectToDashboard = () => {
    router.push('/dashboard');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">My Account</h2>

        {/* Password */}
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Password
          </h2>
          <div className="text-sm">Change the password for your account.</div>
          <div className="mt-5">
            <button
              onClick={redirectToChangePassword}
              className="btn border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm text-indigo-500"
            >
              Set New Password
            </button>
          </div>
        </section>
        <section>
          <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">
            Delete Account
          </h2>
          <div className="text-sm">Permanently delete your account and all associated data.</div>

          <br></br>
          <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleOpenModal}>
            Delete Account
          </button>
        </section>
        <DeleteAccountModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onConfirmDelete={handleDeleteAccount}
          userEmail={userData?.data.email || ''}
          emailToDelete={emailToDelete}
          setEmailToDelete={setEmailToDelete}
        />
      </div>

      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
            <button
              onClick={redirectToDashboard}
              className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
