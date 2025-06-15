'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar'
import { Button } from '@/components/Button'
import { Card, CardContent } from '@/components/Card'
import { Input } from '@/components/Input'
import { useState } from 'react'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Software Developer',
    avatar: '/placeholder-avatar.jpg'
  });

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="Name"
                  />
                  <Input
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="Email"
                  />
                  <Input
                    value={userData.role}
                    onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    placeholder="Role"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.role}</p>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
