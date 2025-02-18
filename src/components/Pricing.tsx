import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      features: [
        'Up to 1,000 inventory items',
        'Basic reporting',
        '2 user accounts',
        'Email support'
      ]
    },
    {
      name: 'Professional',
      price: 99,
      popular: true,
      features: [
        'Unlimited inventory items',
        'Advanced analytics',
        '10 user accounts',
        'Priority support',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: 199,
      features: [
        'Custom solutions',
        'Dedicated account manager',
        'Unlimited everything',
        '24/7 phone support'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Invest in Your Business Growth
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan to streamline your operations
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.popular ? 'border-2 border-indigo-500' : ''
              }`}
            >
              <div className="p-6">
                {plan.popular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                    Popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 block w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-center ${
                    plan.popular
                      ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                      : 'text-indigo-600 bg-white hover:bg-gray-50 border-indigo-600'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}