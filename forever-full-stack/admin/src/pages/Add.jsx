import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Backpacks")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (index, file) => {
    const updatedImages = [...images]
    updatedImages[index] = file
    setImages(updatedImages)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!name || !description || !price || !category || !subCategory) {
      toast.error("Please fill all the required fields.")
      return
    }

    if (price <= 0) {
      toast.error("Price must be a positive number.")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img)
      })

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        resetForm()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to add product.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setPrice("")
    setCategory("Men")
    setSubCategory("Backpacks")
    setBestseller(false)
    setSizes([])
    setImages([null, null, null, null])
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {images.map((img, idx) => (
            <label key={idx} htmlFor={`image${idx}`}>
              <img className='w-20' src={img ? URL.createObjectURL(img) : assets.upload_area} alt="" />
              <input
                type="file"
                id={`image${idx}`}
                hidden
                onChange={(e) => handleImageChange(idx, e.target.files[0])}
              />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p>Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          type="text"
          placeholder='Type here'
          required
        />
      </div>

      <div className='w-full'>
        <p>Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2'
          placeholder='Write content here'
          required
        />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p>Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <p>Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='px-3 py-2'>
            <option value="Backpacks">Backpacks</option>
            <option value="SideSling">Side Sling & Crossbody</option>
            <option value="HandBags">Hand Bags</option>
            <option value="Tote">Tote</option>
            <option value="Pouch">Pouch</option>
            <option value="Clutch">Clutch</option>
          </select>
        </div>

        <div>
          <p>Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='w-full px-3 py-2 sm:w-[120px]'
            type="number"
            min="1"
            placeholder='25'
            required
          />
        </div>
      </div>

      <div>
        <p>Sizes</p>
        <div className='flex gap-3'>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} onClick={() =>
              setSizes(prev =>
                prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
              )
            }>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' checked={bestseller} onChange={() => setBestseller(!bestseller)} />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white' disabled={isLoading}>
        {isLoading ? 'Adding...' : 'ADD'}
      </button>
    </form>
  )
}

export default Add
