import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Status updated');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusBadge = (status) => {
    const colors = {
      'Order Placed': 'bg-gray-400',
      'Packing': 'bg-yellow-500',
      'Shipped': 'bg-blue-500',
      'Out for delivery': 'bg-indigo-500',
      'Delivered': 'bg-green-600',
      'Cancelled': 'bg-red-500',
    };
    return (
      <span className={`text-white text-xs px-2 py-1 rounded ${colors[status] || 'bg-gray-300'}`}>
        {status}
      </span>
    );
  };

  const filteredOrders = orders
    .filter(order => filteredStatus === 'All' || order.status === filteredStatus)
    .filter(order => {
      const fullName = `${order.address.firstName} ${order.address.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => sortOrder === 'Newest' ? b.date - a.date : a.date - b.date);

  return (
    <div className='p-5'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-5'>
        <h3 className='text-2xl font-bold'>Admin Orders</h3>
        <button
          onClick={fetchAllOrders}
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 min-w-[150px]'
        >
          {loading ? (
            <span className='animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5'></span>
          ) : (
            'Refresh Orders'
          )}
        </button>
      </div>

      <div className='flex flex-col md:flex-row gap-3 mb-4'>
        <div>
          <label className='mr-2 font-medium'>Filter by Status:</label>
          <select
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
            className='border p-2 rounded'
          >
            <option value="All">All</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className='mr-2 font-medium'>Search Customer:</label>
          <input
            type='text'
            placeholder='Enter name'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='border p-2 rounded'
          />
        </div>

        <div>
          <label className='mr-2 font-medium'>Sort By:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='border p-2 rounded'
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredOrders.map((order, index) => (
        <div
          key={index}
          className='bg-white shadow-md rounded-lg p-5 mb-4 border'
        >
          <div className='flex items-center mb-3'>
            <img className='w-10 mr-3' src={assets.parcel_icon} alt='' />
            <h4 className='font-semibold'>Order #{order._id.slice(-6).toUpperCase()}</h4>
          </div>

          <div className='mb-2 text-sm'>
            {order.items.map((item, idx) => (
              <p key={idx}>{item.name} x {item.quantity} <span>({item.size})</span></p>
            ))}
          </div>

          <div className='text-sm mb-2'>
            <p><strong>Customer:</strong> {order.address.firstName} {order.address.lastName}</p>
            <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
            <p><strong>Phone:</strong> {order.address.phone}</p>
          </div>

          <div className='text-sm mb-2 flex gap-5 flex-wrap'>
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> {currency}{order.amount}</p>
          </div>

          <div className='flex items-center justify-between flex-wrap gap-2'>
            <div>
              {getStatusBadge(order.status)}
            </div>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 font-semibold border rounded'
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
