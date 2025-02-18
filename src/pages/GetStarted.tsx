import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Get Started with BILL INventory
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Transform your business operations in minutes
          </p>
          
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
            >
              Sign In
            </Link>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Setup Process</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Create Your Account',
                  description: 'Sign up in less than 2 minutes with your basic information'
                },
                {
                  step: 2,
                  title: 'Import or Add Inventory',
                  description: 'Easily import your existing inventory or start fresh'
                },
                {
                  step: 3,
                  title: 'Invite Your Team',
                  description: 'Add team members and set appropriate access levels'
                },
                {
                  step: 4,
                  title: 'Start Managing',
                  description: 'Begin tracking inventory and processing orders immediately'
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 text-lg font-semibold">
                      {item.step}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}