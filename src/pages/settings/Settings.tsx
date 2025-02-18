import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import GeneralSettings from '../../components/settings/GeneralSettings';
import UserSettings from '../../components/settings/UserSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        
        <div className="bg-white rounded-lg shadow divide-y">
          <GeneralSettings />
          <UserSettings />
          <NotificationSettings />
        </div>
      </div>
    </DashboardLayout>
  );
}