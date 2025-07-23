'use client'

import { Edit, MapPin, Plus, Star, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CustomerAddressService } from '@/services/customer-address.service'
import type { Address } from '@/types/customer-address'

import { AddressForm } from './address-form'

/**
 * Addresses page component
 */
export function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  /**
   * Load user addresses
   */
  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true)
      const userAddresses = await CustomerAddressService.getAddresses()
      setAddresses(userAddresses)
    } catch (error: unknown) {
      console.error('  Load addresses error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Adresler yüklenirken hata oluştu'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (data: any) => {
    try {
      setFormLoading(true)

      if (editingAddress) {
        // Update existing address
        await CustomerAddressService.updateAddress(editingAddress._id, data)
        toast.success('Adres başarıyla güncellendi')
      } else {
        // Add new address
        await CustomerAddressService.createAddress(data)
        toast.success('Adres başarıyla eklendi')
      }

      // Reset form and reload addresses
      setShowAddForm(false)
      setEditingAddress(null)
      await loadAddresses()
    } catch (error: unknown) {
      console.error('  Submit address error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Adres kaydedilirken hata oluştu'
      toast.error(errorMessage)
    } finally {
      setFormLoading(false)
    }
  }

  /**
   * Edit address
   */
  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setShowAddForm(true)
  }

  /**
   * Delete address
   */
  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      await CustomerAddressService.deleteAddress(addressId)
      toast.success('Adres başarıyla silindi')
      await loadAddresses()
    } catch (error: unknown) {
      console.error('  Delete address error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Adres silinirken hata oluştu'
      toast.error(errorMessage)
    }
  }

  /**
   * Set default address
   */
  const handleSetDefault = async (addressId: string) => {
    try {
      await CustomerAddressService.setDefaultAddress(addressId)
      toast.success('Varsayılan adres güncellendi')
      await loadAddresses()
    } catch (error: unknown) {
      console.error('  Set default address error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Varsayılan adres ayarlanırken hata oluştu'
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Adreslerim
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Teslimat ve fatura adreslerinizi yönetin
          </p>
        </div>

        {/* Add Address Button */}
        <Button onClick={() => setShowAddForm(true)}>
          <MapPin className="w-4 h-4 mr-2" />
          Adres Ekle
        </Button>
      </div>

      {/* Address Form Sheet */}
      <Sheet open={showAddForm} onOpenChange={setShowAddForm}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle className="text-xl font-semibold">
              {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-6">
            <AddressForm
              address={editingAddress || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowAddForm(false)
                setEditingAddress(null)
              }}
              loading={formLoading}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Addresses List */}
      {!loading && addresses.length > 0 && (
        <div className="space-y-4">
          {addresses.map((address) => (
            <Card key={address._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {address.title}
                      </h3>
                      {address.isDefault && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Varsayılan
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {address.street}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Telefon: {address.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAddress(address._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address._id)}
                      >
                        Varsayılan Yap
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && addresses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Henüz adres eklenmemiş
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              İlk teslimat adresinizi ekleyerek başlayın
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adres Ekle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
