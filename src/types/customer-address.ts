/**
 * Address management types
 */

/**
 * Address type enumeration
 */
export type AddressType = 'home' | 'work' | 'other'

/**
 * Address label enumeration
 */
export type AddressLabel = 'Ev' | 'İş' | 'Diğer'

/**
 * Address interface
 */
export interface Address {
  /** Address ID */
  _id: string
  /** Address title (e.g., "Home", "Work") */
  title: string
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Phone number */
  phone: string
  /** Street address */
  street: string
  /** City */
  city: string
  /** State/Province */
  state: string
  /** Postal code */
  postalCode: string
  /** Country */
  country: string
  /** Is default address */
  isDefault: boolean
  /** Created date */
  createdAt: string
  /** Updated date */
  updatedAt: string
}

/**
 * Create address request interface
 */
export interface CreateAddressRequest {
  /** Address title (e.g., "Home", "Work") */
  title: string
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Phone number */
  phone: string
  /** Street address */
  street: string
  /** City */
  city: string
  /** State/Province */
  state: string
  /** Postal code */
  postalCode: string
  /** Country */
  country: string
}

/**
 * Update address request interface
 */
export interface UpdateAddressRequest {
  /** Address title (e.g., "Home", "Work") */
  title?: string
  /** First name */
  firstName?: string
  /** Last name */
  lastName?: string
  /** Phone number */
  phone?: string
  /** Street address */
  street?: string
  /** City */
  city?: string
  /** State/Province */
  state?: string
  /** Postal code */
  postalCode?: string
  /** Country */
  country?: string
}

/**
 * Address list response
 */
export interface AddressListResponse {
  data: Address[]
  total: number
}

/**
 * Set default address response
 */
export interface SetDefaultAddressResponse {
  message: string
  addressId: string
}

/**
 * Address form data for React Hook Form
 */
export type AddressFormData = CreateAddressRequest
