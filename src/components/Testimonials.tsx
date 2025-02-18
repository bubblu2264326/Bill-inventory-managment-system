export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Retail Store Owner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'Since implementing IBIMS, we\'ve cut our inventory management time by 75% and eliminated stockouts completely.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The automated billing system has reduced our processing errors by 90%. Our customers love the professional invoices.'
    },
    {
      name: 'David Thompson',
      role: 'Wholesale Distributor',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The real-time tracking feature has transformed how we manage our warehouse. We\'re saving $3000 monthly on labor costs.'
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
          Success Stories from Business Owners Like You
        </h2>
        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="lg:col-span-1">
              <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow-lg p-8">
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-6 text-gray-600">{testimonial.quote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}