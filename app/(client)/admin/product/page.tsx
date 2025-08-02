'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { useState } from 'react';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to add product
    console.log('Product data:', productData);
  };

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Add New Product</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-2'>Product Name</label>
          <Input
            name='name'
            value={productData.name}
            onChange={handleInputChange}
            placeholder='Enter product name'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>Description</label>
          <Textarea
            name='description'
            value={productData.description}
            onChange={handleInputChange}
            placeholder='Enter product description'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>Price</label>
          <Input
            type='number'
            name='price'
            value={productData.price}
            onChange={handleInputChange}
            placeholder='Enter price'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>Category</label>
          <Select
            name='category'
            value={productData.category}
            onValueChange={(value) =>
              setProductData((prev) => ({
                ...prev,
                category: value,
              }))
            }
            required
          >
            <option value=''>Select category</option>
            <option value='electronics'>Electronics</option>
            <option value='clothing'>Clothing</option>
            <option value='books'>Books</option>
            <option value='others'>Others</option>
          </Select>
        </div>

        <div>
          <label className='block mb-2'>Image URL</label>
          <Input
            name='image'
            value={productData.image}
            onChange={handleInputChange}
            placeholder='Enter image URL'
            required
          />
        </div>

        <div>
          <label className='block mb-2'>Stock</label>
          <Input
            type='number'
            name='stock'
            value={productData.stock}
            onChange={handleInputChange}
            placeholder='Enter stock quantity'
            required
          />
        </div>

        <Button type='submit' className='w-full'>
          Add Product
        </Button>
      </form>
    </div>
  );
}
