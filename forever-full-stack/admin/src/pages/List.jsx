import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FiEdit, FiSave, FiX, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const toggleListingStatus = async (id, currentStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/toggle-status',
        { id, status: !currentStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(`Product ${!currentStatus ? 'listed' : 'delisted'} successfully`);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product status');
    }
  };

  const handlePriceEdit = (id, currentPrice) => {
    setEditingId(id);
    setEditedPrice(currentPrice);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedPrice('');
  };

  const savePrice = async (id) => {
    if (!editedPrice || isNaN(editedPrice) || editedPrice <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + '/api/product/update-price',
        { id, price: parseFloat(editedPrice) },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Price updated successfully');
        setEditingId(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update price');
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Product removed successfully');
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove product');
    }
  };

  // Filter products based on search term
  const filteredProducts = list.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Management</h2>
      
      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2 top-3 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && list.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">No products found</h3>
          <p className="text-gray-500 mt-2">Add some products to get started</p>
        </div>
      )}

      {/* Product List */}
      {!loading && list.length > 0 && (
        <>
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-50 rounded-t-lg border text-sm font-semibold">
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div className="text-center">Status</div>
            <div className="text-center">Actions</div>
          </div>

          {/* Product Items */}
          <div className="bg-white rounded-b-lg divide-y">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className={`grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-4 p-4 text-sm ${
                  !item.isListed ? 'bg-gray-50' : ''
                }`}
              >
                {/* Product Image */}
                <div className="col-span-1 md:col-auto">
                  <img
                    className="w-12 h-12 object-cover rounded"
                    src={item.image[0] || '/placeholder-product.png'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.png';
                    }}
                  />
                </div>

                {/* Product Name */}
                <div className="col-span-1">
                  <p className={`font-medium ${!item.isListed ? 'line-through text-gray-500' : ''}`}>
                    {item.name}
                  </p>
                </div>

                {/* Category */}
                <div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Price */}
                <div>
                  {editingId === item._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        className="w-20 p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        step="0.01"
                        min="0"
                      />
                      <button
                        onClick={() => savePrice(item._id)}
                        className="text-green-600 hover:text-green-800"
                        aria-label="Save"
                      >
                        <FiSave size={16} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Cancel"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => handlePriceEdit(item._id, item.price)}
                      className="flex items-center cursor-pointer hover:bg-gray-100 p-1 rounded"
                    >
                      <span className="font-medium">{currency}{item.price.toFixed(2)}</span>
                      <FiEdit className="ml-2" size={14} />
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleListingStatus(item._id, item.isListed)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      item.isListed
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {item.isListed ? (
                      <>
                        <FiEye size={14} />
                        <span className="hidden md:inline">Listed</span>
                      </>
                    ) : (
                      <>
                        <FiEyeOff size={14} />
                        <span className="hidden md:inline">Delisted</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full"
                    aria-label="Delete product"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page ? 'bg-blue-500 text-white' : ''
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;