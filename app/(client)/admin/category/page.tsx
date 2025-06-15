'use client'

import { Button } from '@/components/Button'
import { Card, CardContent, CardHeader } from '@/components/Card'
import { Input } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function AddCategory() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Category name is required')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to add category')
      }

      toast.success('Category added successfully')
      setName('')
      router.refresh()
    } catch (error) {
      toast.error('Error adding category')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
          <h2 className="text-2xl font-bold">Add New Category</h2>
          <p className="text-sm text-gray-500">Create a new category for products</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
              {loading ? 'Adding Category...' : 'Add Category'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
