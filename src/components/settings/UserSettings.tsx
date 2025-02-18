import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';

export default function UserSettings() {
  const user = useAuthStore((state) => state.user);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || '',
      email: user?.email || '',
    }
  });

  const onSubmit = (data: any) => {
    console.log('Updating user settings:', data);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">User Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register('fullName')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            disabled
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}