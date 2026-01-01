// Environment configuration for API URLs
// Base URL uses /v1 prefix to match Laravel API

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000/v1',
};

// Public API endpoints
export const Url = {
  // Base
  apiUrl: environment.apiBaseUrl,

  // Authentication
  authUrl: `${environment.apiBaseUrl}/auth`,

  // Public endpoints
  productsUrl: `${environment.apiBaseUrl}/products`,
  categoriesUrl: `${environment.apiBaseUrl}/categories`,
  brandsUrl: `${environment.apiBaseUrl}/brands`,
  cartUrl: `${environment.apiBaseUrl}/cart`,
  wishlistUrl: `${environment.apiBaseUrl}/wishlist`,
  ordersUrl: `${environment.apiBaseUrl}/orders`,
  paymentsUrl: `${environment.apiBaseUrl}/payments`,
  addressesUrl: `${environment.apiBaseUrl}/addresses`,
  reviewsUrl: `${environment.apiBaseUrl}/reviews`,
  shippingMethodsUrl: `${environment.apiBaseUrl}/shipping-methods`,
  couponsUrl: `${environment.apiBaseUrl}/coupons`,
  profileUrl: `${environment.apiBaseUrl}/profile`,
};

// Admin API endpoints
export const AdminUrl = {
  baseUrl: `${environment.apiBaseUrl}/admin`,
  usersUrl: `${environment.apiBaseUrl}/admin/users`,
  productsUrl: `${environment.apiBaseUrl}/admin/products`,
  categoriesUrl: `${environment.apiBaseUrl}/admin/categories`,
  brandsUrl: `${environment.apiBaseUrl}/admin/brands`,
  ordersUrl: `${environment.apiBaseUrl}/admin/orders`,
  couponsUrl: `${environment.apiBaseUrl}/admin/coupons`,
  reviewsUrl: `${environment.apiBaseUrl}/admin/reviews`,
  shippingMethodsUrl: `${environment.apiBaseUrl}/admin/shipping-methods`,
  paymentsUrl: `${environment.apiBaseUrl}/admin/payments`,
};
