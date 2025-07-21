import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using <span className="font-semibold">Kashish Enterprises, keproduct.com</span> ("the Website"), 
          you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our Website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 18 years old to create an account</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials</li>
          <li>All information provided must be accurate and current</li>
          <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Orders and Payments</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All orders are subject to product availability</li>
          <li>Prices are subject to change without notice</li>
          <li>We accept various payment methods as displayed at checkout</li>
          <li>You agree to pay all charges incurred under your account</li>
          <li>In case of payment failure, we reserve the right to cancel your order</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Delivery times are estimates and not guaranteed</li>
          <li>Risk of loss passes to you upon delivery</li>
          <li>You are responsible for providing accurate shipping information</li>
          <li>Additional charges may apply for international shipments</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Returns must be made within 5 days of delivery</li>
          <li>Products must be unused and in original packaging</li>
          <li>Refunds will be processed to the original payment method</li>
          <li>Shipping costs are non-refundable unless the return is due to our error</li>
          <li>Sale items may have different return policies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
        <p className="mb-4">
          All content on this Website, including text, graphics, logos, and images, is our property 
          or the property of our licensors and is protected by copyright laws.
        </p>
        <p>
          You may not reproduce, distribute, or create derivative works without our express written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Website for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper working of the Website</li>
          <li>Upload viruses or malicious code</li>
          <li>Harass other users or our staff</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, <span className="font-semibold">Keproduct</span> shall not be liable for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Any indirect, incidental, or consequential damages</li>
          <li>Errors or omissions in product descriptions</li>
          <li>Delays or interruptions in service</li>
          <li>Damages resulting from third-party services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of New Delhi,India, 
          without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Your continued use of the Website 
          after changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
        <p className="mb-2">
          For questions about these Terms, please contact us at:
        </p>
        <p className="mb-1">
          Email: <a href="mailto:service@keproduct.com" className="text-blue-600 hover:underline">service@keproduct.com</a>
        </p>
        <p>
          Address: Flat no. 498, Pocket - 6, Sector - 2, Rohini, Delhi, 110085
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;