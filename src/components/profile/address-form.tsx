'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
} from '@/types/customer-address'

/**
 * Address form validation schema
 */
const addressFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
})

type AddressFormData = z.infer<typeof addressFormSchema>

interface AddressFormProps {
  /** Existing address for editing */
  address?: Address
  /** Form submit handler */
  onSubmit: (data: CreateAddressRequest | UpdateAddressRequest) => void
  /** Cancel handler */
  onCancel: () => void
  /** Loading state */
  loading?: boolean
}

/**
 * Address form component for creating and editing addresses
 */
export function AddressForm({
  address,
  onSubmit,
  onCancel,
  loading = false,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: address
      ? {
          title: address.title,
          firstName: address.firstName,
          lastName: address.lastName,
          phone: address.phone,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        }
      : {
          title: '',
          firstName: '',
          lastName: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
  })

  const handleFormSubmit = (data: AddressFormData) => {
    if (address) {
      onSubmit({
        addressId: address._id,
        ...data,
      } as UpdateAddressRequest)
    } else {
      onSubmit(data as CreateAddressRequest)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Address Title *</Label>
        <Input
          id="title"
          placeholder="Home, Work, etc."
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register('firstName')}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register('lastName')}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          placeholder="+90 555 123 4567"
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          placeholder="123 Main Street"
          {...register('street')}
          className={errors.street ? 'border-red-500' : ''}
        />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street.message}</p>
        )}
      </div>

      {/* City, State, Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Istanbul"
            {...register('city')}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State/Province *</Label>
          <Input
            id="state"
            placeholder="Istanbul"
            {...register('state')}
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            placeholder="34700"
            {...register('postalCode')}
            className={errors.postalCode ? 'border-red-500' : ''}
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country">Country *</Label>
        <Select
          value={watch('country')}
          onValueChange={value => setValue('country', value)}
        >
          <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Turkey">Turkey</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Italy">Italy</SelectItem>
            <SelectItem value="Spain">Spain</SelectItem>
            <SelectItem value="Netherlands">Netherlands</SelectItem>
            <SelectItem value="Belgium">Belgium</SelectItem>
            <SelectItem value="Switzerland">Switzerland</SelectItem>
            <SelectItem value="Austria">Austria</SelectItem>
            <SelectItem value="Poland">Poland</SelectItem>
            <SelectItem value="Czech Republic">Czech Republic</SelectItem>
            <SelectItem value="Hungary">Hungary</SelectItem>
            <SelectItem value="Romania">Romania</SelectItem>
            <SelectItem value="Bulgaria">Bulgaria</SelectItem>
            <SelectItem value="Greece">Greece</SelectItem>
            <SelectItem value="Croatia">Croatia</SelectItem>
            <SelectItem value="Slovenia">Slovenia</SelectItem>
            <SelectItem value="Slovakia">Slovakia</SelectItem>
            <SelectItem value="Lithuania">Lithuania</SelectItem>
            <SelectItem value="Latvia">Latvia</SelectItem>
            <SelectItem value="Estonia">Estonia</SelectItem>
            <SelectItem value="Finland">Finland</SelectItem>
            <SelectItem value="Sweden">Sweden</SelectItem>
            <SelectItem value="Denmark">Denmark</SelectItem>
            <SelectItem value="Norway">Norway</SelectItem>
            <SelectItem value="Iceland">Iceland</SelectItem>
            <SelectItem value="Ireland">Ireland</SelectItem>
            <SelectItem value="Luxembourg">Luxembourg</SelectItem>
            <SelectItem value="Malta">Malta</SelectItem>
            <SelectItem value="Cyprus">Cyprus</SelectItem>
            <SelectItem value="Portugal">Portugal</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
            <SelectItem value="New Zealand">New Zealand</SelectItem>
            <SelectItem value="Japan">Japan</SelectItem>
            <SelectItem value="South Korea">South Korea</SelectItem>
            <SelectItem value="China">China</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="Brazil">Brazil</SelectItem>
            <SelectItem value="Argentina">Argentina</SelectItem>
            <SelectItem value="Mexico">Mexico</SelectItem>
            <SelectItem value="Chile">Chile</SelectItem>
            <SelectItem value="Colombia">Colombia</SelectItem>
            <SelectItem value="Peru">Peru</SelectItem>
            <SelectItem value="Venezuela">Venezuela</SelectItem>
            <SelectItem value="Uruguay">Uruguay</SelectItem>
            <SelectItem value="Paraguay">Paraguay</SelectItem>
            <SelectItem value="Bolivia">Bolivia</SelectItem>
            <SelectItem value="Ecuador">Ecuador</SelectItem>
            <SelectItem value="Guyana">Guyana</SelectItem>
            <SelectItem value="Suriname">Suriname</SelectItem>
            <SelectItem value="French Guiana">French Guiana</SelectItem>
            <SelectItem value="Falkland Islands">Falkland Islands</SelectItem>
            <SelectItem value="South Africa">South Africa</SelectItem>
            <SelectItem value="Egypt">Egypt</SelectItem>
            <SelectItem value="Morocco">Morocco</SelectItem>
            <SelectItem value="Algeria">Algeria</SelectItem>
            <SelectItem value="Tunisia">Tunisia</SelectItem>
            <SelectItem value="Libya">Libya</SelectItem>
            <SelectItem value="Sudan">Sudan</SelectItem>
            <SelectItem value="Ethiopia">Ethiopia</SelectItem>
            <SelectItem value="Kenya">Kenya</SelectItem>
            <SelectItem value="Tanzania">Tanzania</SelectItem>
            <SelectItem value="Uganda">Uganda</SelectItem>
            <SelectItem value="Rwanda">Rwanda</SelectItem>
            <SelectItem value="Burundi">Burundi</SelectItem>
            <SelectItem value="Democratic Republic of the Congo">
              Democratic Republic of the Congo
            </SelectItem>
            <SelectItem value="Republic of the Congo">
              Republic of the Congo
            </SelectItem>
            <SelectItem value="Central African Republic">
              Central African Republic
            </SelectItem>
            <SelectItem value="Chad">Chad</SelectItem>
            <SelectItem value="Niger">Niger</SelectItem>
            <SelectItem value="Mali">Mali</SelectItem>
            <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
            <SelectItem value="Senegal">Senegal</SelectItem>
            <SelectItem value="Gambia">Gambia</SelectItem>
            <SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
            <SelectItem value="Guinea">Guinea</SelectItem>
            <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
            <SelectItem value="Liberia">Liberia</SelectItem>
            <SelectItem value="Ivory Coast">Ivory Coast</SelectItem>
            <SelectItem value="Ghana">Ghana</SelectItem>
            <SelectItem value="Togo">Togo</SelectItem>
            <SelectItem value="Benin">Benin</SelectItem>
            <SelectItem value="Nigeria">Nigeria</SelectItem>
            <SelectItem value="Cameroon">Cameroon</SelectItem>
            <SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
            <SelectItem value="Gabon">Gabon</SelectItem>
            <SelectItem value="São Tomé and Príncipe">
              São Tomé and Príncipe
            </SelectItem>
            <SelectItem value="Angola">Angola</SelectItem>
            <SelectItem value="Zambia">Zambia</SelectItem>
            <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
            <SelectItem value="Botswana">Botswana</SelectItem>
            <SelectItem value="Namibia">Namibia</SelectItem>
            <SelectItem value="Lesotho">Lesotho</SelectItem>
            <SelectItem value="Eswatini">Eswatini</SelectItem>
            <SelectItem value="Mozambique">Mozambique</SelectItem>
            <SelectItem value="Madagascar">Madagascar</SelectItem>
            <SelectItem value="Mauritius">Mauritius</SelectItem>
            <SelectItem value="Seychelles">Seychelles</SelectItem>
            <SelectItem value="Comoros">Comoros</SelectItem>
            <SelectItem value="Mayotte">Mayotte</SelectItem>
            <SelectItem value="Réunion">Réunion</SelectItem>
            <SelectItem value="Djibouti">Djibouti</SelectItem>
            <SelectItem value="Somalia">Somalia</SelectItem>
            <SelectItem value="Eritrea">Eritrea</SelectItem>
            <SelectItem value="South Sudan">South Sudan</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-6">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : address ? (
            'Update Address'
          ) : (
            'Add Address'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
