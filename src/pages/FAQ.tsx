import React, { useState } from 'react';

const faqData = [
  {
    question: "How can IBIMS help me save money?",
    answer: "IBIMS helps businesses save money in multiple ways. By automating inventory tracking, you can reduce labor costs associated with manual counts by up to 75%. Our smart reordering system prevents stockouts, ensuring you never miss a sale. Additionally, our streamlined billing process reduces errors by 90%, preventing revenue loss from incorrect invoices. On average, businesses using IBIMS report a 40% boost in profits."
  },
  {
    question: "Is IBIMS suitable for my business size?",
    answer: "Yes, IBIMS is designed to scale with your business. We offer plans suitable for small retail stores, mid-sized operations, and large enterprises. Our Starter plan supports up to 1,000 inventory items, while our Professional and Enterprise plans offer unlimited inventory management. You can choose the plan that best fits your current needs and upgrade as your business grows."
  },
  {
    question: "How long does it take to set up IBIMS?",
    answer: "Setting up IBIMS is quick and easy. Most businesses can be up and running within a day. Our intuitive setup wizard guides you through the process of importing your existing inventory data or starting fresh. After the initial setup, you can add team members and configure automated processes. Our support team is always available to assist you during the setup process."
  },
  {
    question: "Can IBIMS integrate with my existing systems?",
    answer: "Yes, IBIMS is designed to integrate seamlessly with a wide range of business systems. Our Professional and Enterprise plans include API access, allowing for custom integrations with your existing ERP, CRM, or e-commerce platforms. If you need help with integration, our dedicated support team can assist you in ensuring IBIMS works harmoniously with your current tech stack."
  },
  {
    question: "How does IBIMS handle multiple locations or warehouses?",
    answer: "IBIMS is built to manage inventory across multiple locations or warehouses. You can easily track stock levels, transfer inventory between locations, and generate reports for individual locations or your entire operation. This feature ensures you have a comprehensive view of your inventory, regardless of how distributed your business may be."
  },
  {
    question: "What kind of support does IBIMS offer?",
    answer: "We offer tiered support based on your plan. All plans include email support, with our team typically responding within 24 hours. Professional plan users get priority support with faster response times. Enterprise plan customers benefit from 24/7 phone support and a dedicated account manager to ensure your business needs are always met promptly and efficiently."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all our plans. This allows you to experience the full capabilities of IBIMS and see how it can transform your inventory management. During the trial, you'll have access to all features of the plan you're interested in, and our support team will be available to answer any questions you may have."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="text-lg font-semibold">{question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600 mb-4">Still have questions? We're here to help!</p>
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

