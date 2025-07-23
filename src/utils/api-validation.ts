import { z } from 'zod'

/**
 * Validation schemas for API requests using Zod
 */

/**
 * Address validation schemas
 */
export const createAddressSchema = z.object({
  title: z
    .string()
    .min(1, 'Address title is required')
    .max(100, 'Title too long'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  company: z.string().max(100, 'Company name too long').optional(),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone format'),
  street: z
    .string()
    .min(1, 'Street address is required')
    .max(200, 'Street address too long'),
  city: z.string().min(1, 'City is required').max(100, 'City name too long'),
  state: z.string().min(1, 'State is required').max(100, 'State name too long'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(100, 'Country name too long'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .max(20, 'Postal code too long'),
  type: z.enum(['home', 'work', 'other'], { message: 'Invalid address type' }),
  isDefault: z.boolean().optional(),
})

export const updateAddressSchema = createAddressSchema.partial()

/**
 * Cart validation schemas
 */
export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity too large'),
})

export const updateCartItemSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity too large'),
})

export const applyCampaignSchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
})

/**
 * Wishlist validation schemas
 */
export const addToWishlistSchema = z.object({
  notes: z.string().max(500, 'Notes too long').optional(),
})

export const updateWishlistNotesSchema = z.object({
  notes: z.string().min(1, 'Notes are required').max(500, 'Notes too long'),
})

/**
 * Profile validation schemas
 */
export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name too long')
    .optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long')
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone format')
    .optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .optional(),
  gender: z
    .enum(['male', 'female', 'other'], { message: 'Invalid gender' })
    .optional(),
  preferences: z
    .object({
      language: z.string().max(10, 'Language code too long').optional(),
      newsletter: z.boolean().optional(),
      smsNotifications: z.boolean().optional(),
      emailNotifications: z.boolean().optional(),
    })
    .optional(),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain uppercase, lowercase, and number'
      ),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const changeEmailSchema = z.object({
  newEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

/**
 * Review validation schemas
 */
export const createReviewSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  rating: z
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  title: z
    .string()
    .min(1, 'Review title is required')
    .max(200, 'Title too long'),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(2000, 'Comment too long'),
  images: z.array(z.string()).max(10, 'Too many images').optional(),
})

export const updateReviewSchema = createReviewSchema
  .partial()
  .omit({ productId: true })

/**
 * Search validation schemas
 */
export const searchSchema = z.object({
  q: z
    .string()
    .min(1, 'Search query is required')
    .max(200, 'Search query too long'),
  type: z.enum(['all', 'products', 'categories', 'sellers']).optional(),
  page: z.number().int().min(1, 'Page must be at least 1').optional(),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit too large')
    .optional(),
})

/**
 * Product list validation schemas
 */
export const productListSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').optional(),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit too large')
    .optional(),
  search: z.string().max(200, 'Search query too long').optional(),
  category: z.string().optional(),
  minPrice: z.number().min(0, 'Minimum price cannot be negative').optional(),
  maxPrice: z.number().min(0, 'Maximum price cannot be negative').optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

/**
 * Payment method validation schemas
 */
export const paymentMethodSchema = z
  .object({
    type: z.enum(['credit_card', 'debit_card', 'paypal', 'apple_pay'], {
      message: 'Invalid payment method type',
    }),
    cardNumber: z
      .string()
      .regex(/^\d{13,19}$/, 'Invalid card number')
      .optional(),
    expiryMonth: z
      .string()
      .regex(/^(0[1-9]|1[0-2])$/, 'Invalid expiry month')
      .optional(),
    expiryYear: z
      .string()
      .regex(/^20\d{2}$/, 'Invalid expiry year')
      .optional(),
    cvv: z
      .string()
      .regex(/^\d{3,4}$/, 'Invalid CVV')
      .optional(),
    cardHolderName: z
      .string()
      .min(1, 'Card holder name is required')
      .max(100, 'Name too long')
      .optional(),
    paypalEmail: z.string().email('Invalid PayPal email').optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'credit_card' || data.type === 'debit_card') {
      if (!data.cardNumber) {
        ctx.addIssue({
          code: 'custom',
          message: 'Card number is required for card payments',
          path: ['cardNumber'],
        })
      }
      if (!data.expiryMonth) {
        ctx.addIssue({
          code: 'custom',
          message: 'Expiry month is required for card payments',
          path: ['expiryMonth'],
        })
      }
      if (!data.expiryYear) {
        ctx.addIssue({
          code: 'custom',
          message: 'Expiry year is required for card payments',
          path: ['expiryYear'],
        })
      }
      if (!data.cvv) {
        ctx.addIssue({
          code: 'custom',
          message: 'CVV is required for card payments',
          path: ['cvv'],
        })
      }
      if (!data.cardHolderName) {
        ctx.addIssue({
          code: 'custom',
          message: 'Card holder name is required for card payments',
          path: ['cardHolderName'],
        })
      }
    }
    if (data.type === 'paypal' && !data.paypalEmail) {
      ctx.addIssue({
        code: 'custom',
        message: 'PayPal email is required for PayPal payments',
        path: ['paypalEmail'],
      })
    }
  })

/**
 * Category products validation schema
 */
export const categoryProductsSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
  page: z.number().int().min(1, 'Page must be at least 1').optional(),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit too large')
    .optional(),
  sortBy: z.enum(['price', 'name', 'createdAt', 'rating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  search: z.string().max(200, 'Search query too long').optional(),
  minPrice: z.number().min(0, 'Minimum price cannot be negative').optional(),
  maxPrice: z.number().min(0, 'Maximum price cannot be negative').optional(),
})

/**
 * Campaign list validation schema
 */
export const campaignListSchema = z.object({
  page: z.number().int().min(1, 'Page must be at least 1').optional(),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(50, 'Limit too large')
    .optional(),
  type: z.enum(['platform', 'seller']).optional(),
  discountType: z.enum(['percentage', 'amount']).optional(),
  categoryId: z.string().min(1, 'Category ID is required').optional(),
  productId: z.string().min(1, 'Product ID is required').optional(),
  minDiscount: z
    .number()
    .min(0, 'Minimum discount cannot be negative')
    .optional(),
  maxDiscount: z
    .number()
    .min(0, 'Maximum discount cannot be negative')
    .optional(),
  search: z.string().max(200, 'Search query too long').optional(),
  sortBy: z.enum(['createdAt', 'discountValue', 'endDate', 'name']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  isActive: z.boolean().optional(),
})

/**
 * Product campaigns validation schema
 */
export const productCampaignsSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(50, 'Limit too large')
    .optional(),
})

/**
 * Campaign applicability validation schema
 */
export const campaignApplicabilitySchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
})

/**
 * Checkout validation schema
 */
export const checkoutSchema = z.object({
  shippingAddress: createAddressSchema.omit({ isDefault: true }),
  billingAddress: createAddressSchema.omit({ isDefault: true }),
  paymentMethod: paymentMethodSchema,
  notes: z.string().max(1000, 'Notes too long').optional(),
})
