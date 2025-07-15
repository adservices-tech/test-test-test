import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to <span className="font-semibold">Keproduct ( Kashish Enterprises )</span> ("we," "our," or "us"). 
          We respect your privacy and are committed to protecting your personal data. 
          This policy explains how we collect, use, and safeguard your information when you visit our website 
          or make a purchase.
        </p>
        <p>
          By using our site, you agree to this Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <h3 className="text-xl font-medium mb-2">Personal Information</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Name, email, phone number</li>
          <li>Billing/shipping address</li>
          <li>Payment details (processed securely via our payment gateways)</li>
          <li>Account credentials (if you register)</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-2">Automated Data</h3>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>IP address, browser type, device information</li>
          <li>Cookies and usage data (via Google Analytics)</li>
          <li>Pages visited and interactions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To process and fulfill your orders</li>
          <li>To communicate about your account/orders</li>
          <li>To improve our website and services</li>
          <li>For security and fraud prevention</li>
          <li>For marketing (with your consent)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
        <p className="mb-4">
          We only share your data with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Payment processors to complete transactions</li>
          <li>Shipping carriers to deliver your orders</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <p className="mt-4">
          We never sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access, update, or delete your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of your data</li>
          <li>Withdraw consent (where applicable)</li>
        </ul>
        <p className="mt-4">
          To exercise these rights, please contact us at <a href="mailto:service@keproduct.com" className="text-blue-600 hover:underline">service@keproduct.com</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
        <p className="mb-4">
          We use cookies to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Remember your preferences</li>
          <li>Analyze site traffic</li>
          <li>Improve user experience</li>
        </ul>
        <p className="mt-4">
          You can disable cookies in your browser settings, but some site features may not work properly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
        <p>
          We implement industry-standard security measures including SSL encryption, 
          secure payment processing, and restricted access to your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
        <p>
          We may update this policy periodically. The latest version will always be posted here 
          with the updated date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p>
          For any privacy-related questions, please contact us at:
        </p>
        <p className="mt-2">
          Email: <a href="mailto:service@keproduct.com" className="text-blue-600 hover:underline">service@keproduct.com</a>
        </p>
        <p>
          Address: Flat no. 498, Pocket - 6, Sector - 2, Rohini, Delhi, 110085
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;