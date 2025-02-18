import React from 'react';
import { ArrowRight, BarChart2, Clock, DollarSign, ShoppingCart, Users } from 'lucide-react';

const features = [
  {
    title: "Real-time Analytics Dashboard",
    description: "Get instant insights into your inventory levels, sales trends, and financial performance.",
    icon: BarChart2,
  },
  {
    title: "Automated Inventory Tracking",
    description: "Eliminate manual counts and reduce time spent on inventory management by 75%.",
    icon: ShoppingCart,
  },
  {
    title: "Smart Reordering",
    description: "Prevent stockouts with AI-powered reordering suggestions based on historical data.",
    icon: Clock,
  },
  {
    title: "Streamlined Billing",
    description: "Reduce billing errors by 90% with our automated invoicing system.",
    icon: DollarSign,
  },
  {
    title: "Team Collaboration",
    description: "Add team members, set access levels, and improve communication across departments.",
    icon: Users,
  },
];

const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Features() {
  return (
    <div className="bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Features That Drive Results</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-4">Transform Your Inventory Management</h2>
          <p className="text-xl mb-6">Join over 1,000 businesses who've eliminated stockouts and billing errors with our all-in-one solution</p>
          <ul className="mb-8 space-y-2">
            <li className="flex items-center"><ArrowRight className="mr-2" /> Boost profits by up to 40%</li>
            <li className="flex items-center"><ArrowRight className="mr-2" /> Eliminate $50,000 annual losses from poor management</li>
            <li className="flex items-center"><ArrowRight className="mr-2" /> Reduce inventory management time by 75%</li>
          </ul>
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition duration-300">
            Get Started
          </button>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Your Path to Inventory Excellence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Quick Setup", description: "Import your inventory data or start fresh with our intuitive setup wizard" },
              { step: 2, title: "Team Onboarding", description: "Add team members and set appropriate access levels" },
              { step: 3, title: "Automate Operations", description: "Configure automated reordering and billing processes" },
              { step: 4, title: "Monitor & Grow", description: "Track performance and scale your business with real-time insights" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Revolutionize Your Inventory Management?</h2>
          <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 text-lg">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </div>
  );
}

