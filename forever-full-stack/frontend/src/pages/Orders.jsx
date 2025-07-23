import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

const loadOrders = async () => {
  if (!token) return;
  setRefreshing(true);
  try {
    const res = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
    if (res.data.success) {
      const filteredOrders = res.data.orders.filter(order =>
        order.paymentMethod === 'COD' || (order.paymentMethod === 'Razorpay' && order.payment === true)
      );
      setOrders(filteredOrders.reverse());
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to load orders');
  } finally {
    setTimeout(() => setRefreshing(false), 2000);
  }
};


  useEffect(() => {
    loadOrders();
  }, [token]);

  const cancelOrderHandler = async (orderId) => {
    try {
      const res = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } });
      if (res.data.success) {
        toast.success('Order cancelled');
        loadOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error cancelling order');
    }
  };

  const steps = ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered", "Cancelled"];

  const ProgressTracker = ({ currentStatus }) => {
    const currentStep = steps.indexOf(currentStatus);

    return (
      <div className='flex items-center justify-between mt-6'>
        {steps.map((step, index) => {
          const isActive = index <= currentStep && currentStatus !== 'Cancelled';
          const isCancelled = currentStatus === 'Cancelled' && step === 'Cancelled';

          return (
            <div key={index} className='flex-1 flex flex-col items-center'>
              <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center
                ${isActive ? 'bg-green-600' : isCancelled ? 'bg-red-500' : 'bg-gray-300'}`}>
                {isActive ? '✓' : isCancelled ? '✗' : index + 1}
              </div>
              <p className='text-xs mt-1 text-center'>{step}</p>
              {index < steps.length - 1 && (
                <div className={`h-1 w-full ${index < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className='max-w-5xl mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>My Orders</h2>
        <button
          onClick={loadOrders}
          className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-2'
          disabled={refreshing}
        >
          {refreshing ? (
            <span className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></span>
          ) : (
            'Refresh Orders'
          )}
        </button>
      </div>

      {orders.map((order) => (
        <div key={order._id} className='border rounded-lg shadow-sm p-4 mb-6'>
          <div className='flex flex-col md:flex-row gap-6'>

            {/* Left Side - Product Images & Details */}
            <div className='md:w-1/2'>
              <h4 className='font-semibold mb-2'>Products</h4>
              {order.items.map((item, idx) => (
                <div key={idx} className='flex items-center gap-3 mb-2'>
                  <img src={item.image[0]} alt='' className='w-20 h-20 object-cover rounded'/>
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-sm text-gray-600'>Qty: {item.quantity} | Size: {item.size}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Order Details */}
            <div className='md:w-1/2 space-y-2'>
              <h4 className='font-semibold mb-2'>Order Info</h4>
              <p><strong>Order ID: #{order._id.slice(-6).toUpperCase()}</strong></p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> {currency}{order.amount}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

              <button
                onClick={() => setSelectedAddress(order.address)}
                className='bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-400'
              >
                View Shipping Info
              </button>

              {['Order Placed', 'Packing'].includes(order.status) && (
                <button
                  onClick={() => cancelOrderHandler(order._id)}
                  className='bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600'
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>

          {/* Progress Tracker */}
          <ProgressTracker currentStatus={order.status} />
        </div>
      ))}

      {selectedAddress && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg max-w-sm w-full'>
            <h4 className='text-lg font-bold mb-4'>Shipping Information</h4>
            <p><strong>Name:</strong> {selectedAddress.firstName} {selectedAddress.lastName}</p>
            <p><strong>Phone:</strong> {selectedAddress.phone}</p>
            <p><strong>Address:</strong> {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country} - {selectedAddress.zipcode}</p>

            <button
              onClick={() => setSelectedAddress(null)}
              className='mt-4 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
