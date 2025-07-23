'use client'

import { Eye, EyeOff, Lock, Phone, User, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAppSelector } from '@/hooks/redux'
import { AuthService } from '@/services/customer-auth.service'

/**
 * Account Settings component
 * Handles user profile updates with proper validation and feedback
 */
export function ProfileAccount() {
  const { user } = useAppSelector(state => state.auth)
  const [showPassword, setShowPassword] = useState(false)

  // Name change states
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [nameLoading, setNameLoading] = useState(false)
  const [namePassword, setNamePassword] = useState('')

  // Phone change states
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [phonePassword, setPhonePassword] = useState('')

  // Password change states
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')

  if (!user) {
    return (
      <Card className="p-8 text-center">
        <div className="text-gray-600 dark:text-gray-400">
          Failed to load user information
        </div>
      </Card>
    )
  }

  const handleNameChange = async () => {
    if (!namePassword) {
      toast.error('Please enter your current password')
      return
    }

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('First name and last name fields cannot be empty')
      return
    }

    try {
      setNameLoading(true)
      await AuthService.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })

      toast.success('Name information updated successfully')
      setNamePassword('')
    } catch (error: unknown) {
      console.log('Update profile error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to update profile'
      toast.error(errorMessage)
    } finally {
      setNameLoading(false)
    }
  }

  const handlePhoneChange = async () => {
    if (!phonePassword) {
      toast.error('Please enter your current password')
      return
    }

    if (!phoneNumber.trim()) {
      toast.error('Phone number cannot be empty')
      return
    }

    // Simple phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    if (!phoneRegex.test(phoneNumber.trim().replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number')
      return
    }

    try {
      setPhoneLoading(true)
      await AuthService.updateProfile({
        phone: phoneNumber.trim(),
      })

      toast.success('Phone number updated successfully')
      setPhonePassword('')
    } catch (error: unknown) {
      console.log('Update profile error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to update profile'
      toast.error(errorMessage)
    } finally {
      setPhoneLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      toast.error('Please enter your current password')
      return
    }

    if (!newPassword || !confirmPassword) {
      toast.error('New password fields cannot be empty')
      return
    }

    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    try {
      setPasswordLoading(true)
      await AuthService.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      })

      toast.success('Password changed successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: unknown) {
      console.log('Change password error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to change password'
      toast.error(errorMessage)
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Account Settings
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update your account information securely
        </p>
      </div>

      {/* Current User Info */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Current Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium">First Name</Label>
              <Input value={user.firstName} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
            </div>
            <div>
              <Label className="text-sm font-medium">Last Name</Label>
              <Input value={user.lastName} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input value={user.email} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
            <p className="text-xs text-gray-500 mt-2">
              Email address cannot be changed for security reasons
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium">Phone Number</Label>
            <Input
              value={user.phoneNumber ? user.phoneNumber : 'Not specified'}
              disabled
              className="mt-2 bg-gray-50 dark:bg-gray-800"
            />
          </div>
          <div>
            <Label className="text-sm font-medium">Member Since</Label>
            <Input
              value={new Date(user.createdAt).toLocaleDateString('en-US')}
              disabled
              className="mt-2 bg-gray-50 dark:bg-gray-800"
            />
          </div>
        </CardContent>
      </Card>

      {/* Name Change Section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Change Name
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">New First Name *</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Your new first name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">New Last Name *</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Your new last name"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="namePassword" className="text-sm font-medium">Current Password *</Label>
            <div className="relative mt-2">
              <Input
                id="namePassword"
                type={showPassword ? 'text' : 'password'}
                value={namePassword}
                onChange={e => setNamePassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handleNameChange}
            disabled={
              nameLoading ||
              !firstName.trim() ||
              !lastName.trim() ||
              !namePassword
            }
            className="w-full"
          >
            {nameLoading ? 'Updating...' : 'Update Name'}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Phone Change Section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Change Phone Number
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div>
            <Label htmlFor="phoneNumber" className="text-sm font-medium">New Phone Number *</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="+90 555 123 4567"
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              Use international format (e.g., +90 555 123 4567)
            </p>
          </div>

          <div>
            <Label htmlFor="phonePassword" className="text-sm font-medium">Current Password *</Label>
            <div className="relative mt-2">
              <Input
                id="phonePassword"
                type={showPassword ? 'text' : 'password'}
                value={phonePassword}
                onChange={e => setPhonePassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handlePhoneChange}
            disabled={phoneLoading || !phoneNumber.trim() || !phonePassword}
            className="w-full"
          >
            {phoneLoading ? 'Updating...' : 'Update Phone Number'}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* Password Change Section */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-4 px-6 pt-6">
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6">
          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium">New Password *</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Your new password (at least 6 characters)"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="passwordCurrent" className="text-sm font-medium">Current Password *</Label>
            <div className="relative mt-2">
              <Input
                id="passwordCurrent"
                type={showPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={
              passwordLoading ||
              !newPassword ||
              !confirmPassword ||
              !currentPassword
            }
            className="w-full"
          >
            {passwordLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
