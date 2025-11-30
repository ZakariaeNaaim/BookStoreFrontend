export const API_CONFIG = {
  baseUrl: 'https://localhost:5001/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      refreshToken: '/auth/refresh-token',
    },
    books: '/books',
    categories: '/categories',
    cart: '/cart',
    orders: '/orders',
  },
};
