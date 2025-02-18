import React from 'react';
import { useForm } from 'react-hook-form';

export default function NotificationSettings() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      emailNotifications: true,
      lowStockAlerts: true,
      orderUpdates: true,
      marketingEmails: false,
    }
  });

  const onSubmit = (data: any) => {
    console.log('Updating notification settings:', data);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
            </div>
            <input type="checkbox" {...register('emailNotifications')} className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Low Stock Alerts</h3>
              <p className="text-sm text-gray-500">Get notified when products are running low</p>
            </div>
            <input type="checkbox" {...register('lowStockAlerts')} className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Order Updates</h3>
              <p className="text-sm text-gray-500">Receive notifications for order status changes</p>
            </div>
            <input type="checkbox" {...register('orderUpdates')} className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
              <p className="text-sm text-gray-500">Receive promotional emails and updates</p>
            </div>
            <input type="checkbox" {...register('marketingEmails')} className="h-4 w-4" />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}