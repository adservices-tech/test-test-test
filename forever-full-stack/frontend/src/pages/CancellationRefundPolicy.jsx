import React from 'react';

const CancellationRefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">Cancellation & Refund Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Order Cancellation</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Before Shipment</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>You may cancel your order within 24 hours of placement without penalty</li>
              <li>For cancellations after 24 hours but before shipment, a processing fee of ₹100 may apply</li>
              <li>To cancel, email us at <a href="mailto:service@keproduct.com" className="text-blue-600 hover:underline">service@keproduct.com</a> with your order number</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">After Shipment</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Once shipped, you cannot cancel but may return the item after delivery</li>
              <li>You may refuse delivery to initiate a return</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Returns</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Eligibility</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Items must be returned within 14 days of delivery</li>
              <li>Products must be unused, in original packaging with all tags attached</li>
              <li>Certain items are non-returnable (e.g., perishables, personalized items)</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Return Process</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our support team to initiate a return</li>
              <li>We'll provide a return authorization number and instructions</li>
              <li>Pack the item securely with the original packaging</li>
              <li>Ship using our recommended carrier or drop at nearest affiliated center</li>
            </ol>
            <p className="mt-2 text-sm text-gray-600">Note: You are responsible for return shipping costs unless the return is due to our error</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Refunds</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Processing</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Refunds are processed within 5-7 business days after we receive the returned item</li>
              <li>You will receive email confirmation when your refund is processed</li>
              <li>Refunds are issued to the original payment method</li>
              <li>Bank processing times may add 3-5 additional business days</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Deductions</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Original shipping charges are non-refundable</li>
              <li>Restocking fee of 15% may apply for opened items</li>
              <li>Return shipping costs are deducted unless return is due to our error</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Damaged or Defective Items</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ul className="list-disc pl-6 space-y-2">
            <li>Contact us within 48 hours of delivery with photos of the damage</li>
            <li>We will arrange free return shipping and full refund/replacement</li>
            <li>For partial defects, we may offer partial refunds</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Exchanges</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc pl-6 space-y-1">
            <li>We currently only offer refunds, not direct exchanges</li>
            <li>To exchange an item, return the original and place a new order</li>
            <li>Price differences will be charged/refunded as applicable</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-2">For any cancellation or refund inquiries:</p>
          <p className="mb-1">Email: <a href="mailto:service@keproduct.com" className="text-blue-600 hover:underline">service@keproduct.com</a></p>
          <p>Phone: <a href="tel:+91 1146056588" className="text-blue-600 hover:underline">+91 1146056588</a> (10AM-6PM, Mon-Sat)</p>
          <p className="mt-2 text-sm">Please include your order number in all communications</p>
        </div>
      </section>
    </div>
  );
};

export default CancellationRefundPolicy;