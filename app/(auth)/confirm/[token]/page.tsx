'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AuthLogo from '../../auth-logo';
import Spinner from 'react-bootstrap/Spinner';
import { ToastType } from '@/shared/types/toast';
import Toast03 from '@/app/components/toast-03';

const ConfirmationPage = () => {
  const router = useRouter();
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
  }>({
    open: false,
    type: '',
    message: '',
  });

  useEffect(() => {
    if (status === 'success') {
      setToast({
        open: true,
        type: 'success',
        message:
          'Your account has been successfully confirmed! \n You will be redirected to the sign in page shortly.',
      });
      setTimeout(() => {
        router.push('/signin');
      }, 3000); // 3 seconds delay
    }
  }, [status, router]);

  useEffect(() => {
    if (!token) {
      setMessage('No confirmation token found in the URL.');
      setStatus('error');
    }
  }, [token]);

  const confirmAccount = async () => {
    if (!token) return;

    setLoading(true); // Start loading
    setStatus('loading');

    try {
      const response = await fetch(`/api/confirm/${token}`);
      const data = await response.json();
      setLoading(false); // Stop loading

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false); // Stop loading
      setStatus('error');
      setMessage('A network error occurred, please try again later.');
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto text-center pb-12">
        <AuthLogo />
        <h1 className="text-xl font-semibold">Account Confirmation</h1>
      </div>

      <div className="max-w-sm mx-auto text-center">
        {status === 'loading' && <Spinner animation="border" />}
        {status === 'success' && <p>Your account has been successfully confirmed!</p>}
        {status === 'idle' && (
          <button
            className="btn text-sm text-white bg-purple-500 hover:bg-purple-600 w-full shadow-sm"
            onClick={confirmAccount}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        )}
        {status === 'error' && <p>{message}</p>}
      </div>
      {toast.open && (
        <div className="fixed top-0 right-0 p-4">
          <Toast03
            open={toast.open}
            setOpen={(open) => setToast({ ...toast, open })}
            type={toast.type}
          >
            {toast.message}
          </Toast03>
        </div>
      )}
    </div>
  );
};

export default ConfirmationPage;
