import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  retry: {
    limit: 3,
    methods: ['get', 'post', 'put']
  },
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          return ky(request, options);
        }
        
        return response;
      }
    ],
    beforeError: [
      error => {
        error.message = `API Error: ${error.message}`;
        return error;
      }
    ],
  }
});
