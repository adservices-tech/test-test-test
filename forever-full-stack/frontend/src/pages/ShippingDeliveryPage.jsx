import React, { useState } from 'react';

const ShippingDeliveryPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  
  const shippingData = {
    India: {
      standard: { time: '3-5 business days', price: '₹50', freeThreshold: '₹1000' },
      express: { time: '1-2 business days', price: '₹120' },
      overnight: { time: 'Next business day', price: '₹250', available: 'Metro cities only' },
      notes: [
        'Cash on Delivery available for most locations',
        'Rural areas may experience 1-2 day delays'
      ]
    },
    International: {
      standard: { time: '7-14 business days', price: '₹2200' },
      express: { time: '3-5 business days', price: '₹2000' },
      overnight: { time: 'Not available', price: '-' },
      notes: [
        'Customs duties may apply for international orders',
        'Free shipping on orders over ₹5000',
        'Delivery times may vary based on destination country'
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Shipping & Delivery Information</h1>
      
      {/* Country Selector */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setSelectedCountry('India')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${selectedCountry === 'India' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            India
          </button>
          <button
            onClick={() => setSelectedCountry('International')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${selectedCountry === 'International' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Other Countries
          </button>
        </div>
      </div>

      {/* Shipping Options */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Shipping Options</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Standard Shipping</h3>
            <p className="mb-1"><span className="font-semibold">Delivery:</span> {shippingData[selectedCountry].standard.time}</p>
            <p className="mb-1"><span className="font-semibold">Cost:</span> {shippingData[selectedCountry].standard.price}</p>
            {shippingData[selectedCountry].standard.freeThreshold && (
              <p className="text-sm text-green-600">Free on orders over {shippingData[selectedCountry].standard.freeThreshold}</p>
            )}
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Express Shipping</h3>
            <p className="mb-1"><span className="font-semibold">Delivery:</span> {shippingData[selectedCountry].express.time}</p>
            <p className="mb-1"><span className="font-semibold">Cost:</span> {shippingData[selectedCountry].express.price}</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-medium mb-2">Overnight Shipping</h3>
            <p className="mb-1"><span className="font-semibold">Delivery:</span> {shippingData[selectedCountry].overnight.time}</p>
            <p className="mb-1"><span className="font-semibold">Cost:</span> {shippingData[selectedCountry].overnight.price}</p>
            {shippingData[selectedCountry].overnight.available && (
              <p className="text-sm text-gray-500">{shippingData[selectedCountry].overnight.available}</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Important Notes:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {shippingData[selectedCountry].notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Delivery Process</h2>
        <div className="space-y-6">
          {[
            { step: 1, title: "Order Processing", description: "We verify and prepare your order for shipment within 24 hours." },
            { step: 2, title: "Shipping", description: "Your package is handed to our logistics partner with tracking information provided to you." },
            { step: 3, title: "In Transit", description: selectedCountry === 'India' 
              ? "Delivered via our trusted partners like Delhivery, BlueDart, or India Post." 
              : "International shipments are handled by FedEx, DHL, or similar carriers." },
            { step: 4, title: "Delivery", description: selectedCountry === 'India' 
              ? "Expect a call from the delivery executive for address confirmation." 
              : "May require customs clearance and payment of duties if applicable." }
          ].map((item) => (
            <div key={item.step} className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { 
              question: "How can I track my order?", 
              answer: "Once shipped, you'll receive a tracking number via SMS/email. You can track it on our website or the courier company's portal." 
            },
            { 
              question: "What if I'm not available during delivery?", 
              answer: selectedCountry === 'India' 
                ? "The delivery executive will typically call you to schedule another attempt or leave it with a neighbor/security." 
                : "The carrier will leave a notice with instructions for pickup or redelivery." 
            },
            { 
              question: "Do you ship to remote locations?", 
              answer: selectedCountry === 'India' 
                ? "Yes, we ship across India including remote areas, though delivery times may be longer." 
                : "We ship to most countries worldwide, with some exceptions for high-risk areas." 
            },
            { 
              question: "What's your return policy?", 
              answer: "We offer 7-day easy returns for most products. Return shipping is free for defective/wrong items." 
            }
          ].map((faq, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShippingDeliveryPage;