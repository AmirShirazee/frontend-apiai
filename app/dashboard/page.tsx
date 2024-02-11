'use client';

import React from 'react';
import WelcomeBanner from './welcome-banner';
import { useSession } from 'next-auth/react';
import { Spinner } from 'react-bootstrap';
import useAuthCheck from '@/utils/useAuth';
import useUserData from '@/utils/useUserData';
import Toast03 from '@/app/components/toast-03';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const isLoadingAuth = useAuthCheck();
  const userData = useUserData(session!, status);
  const { isLoading, isToastOpen, allData, setIsToastOpen } = userData;
  const safeSetIsToastOpen = setIsToastOpen || (() => {});

  console.log(allData);

  if (isLoadingAuth || isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  }

  const userActionContent = allData?.didUpload
    ? {
        message: 'View your tests!',
        action: () => (window.location.href = '/dashboard/tests/view'),
      }
    : {
        message: 'Upload a new file to generate tests.',
        action: () => (window.location.href = '/dashboard/openapi/upload'),
      };

  return (
    <div className="dashboard-container">
      <Toast03 type="error" open={isToastOpen} setOpen={safeSetIsToastOpen}>
        Error loading user data.
      </Toast03>

      <div className="dashboard-content">
        <div className="user-action" onClick={userActionContent.action}>
          <p className="user-action-message">{userActionContent.message}</p>
          <button className="user-action-button">
            {allData?.didUpload ? 'View Tests' : 'Upload File'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
