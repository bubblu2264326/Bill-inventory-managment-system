import { AlertCircle, BarChart3, Clock, DollarSign } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'Spending hours on manual inventory counts',
      icon: Clock,
      description: 'Manual processes are time-consuming and error-prone'
    },
    {
      name: 'Lost sales due to stockouts',
      icon: AlertCircle,
      description: 'Missing sales opportunities hurts your bottom line'
    },
    {
      name: 'Billing errors costing thousands',
      icon: DollarSign,
      description: 'Mistakes in billing lead to lost revenue'
    }
  ];

  const solutions = [
    {
      step: 1,
      title: 'Quick Setup',
      description: 'Import your inventory data or start fresh with our intuitive setup wizard'
    },
    {
      step: 2,
      title: 'Team Onboarding',
      description: 'Add team members and set appropriate access levels'
    },
    {
      step: 3,
      title: 'Automate Operations',
      description: 'Configure automated reordering and billing processes'
    },
    {
      step: 4,
      title: 'Monitor & Grow',
      description: 'Track performance and scale your business with real-time insights'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Businesses Lose $50,000 Annually Due to Poor Inventory Management
          </h2>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-extrabold text-center text-gray-900 sm:text-3xl">
            Your Path to Inventory Excellence
          </h3>
          <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {solutions.map((solution) => (
              <div key={solution.step} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl font-semibold">
                      {solution.step}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{solution.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{solution.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}