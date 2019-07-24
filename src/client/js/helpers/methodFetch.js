const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const DELETE = 'DELETE';

const methodFetch = (method, url, data = {}) => {
  const option = {
    method,
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== GET) {
    option.body = JSON.stringify(data);
  }
  return fetch(url, option).then(response => response.json());
};

const reedFetch = (url, data = {}) => methodFetch(GET, url, data);
const updateFetch = (url, data = {}) => methodFetch(PUT, url, data);
const createFetch = (url, data = {}) => methodFetch(POST, url, data);
const deleteFetch = (url, data = {}) => methodFetch(DELETE, url, data);

export { reedFetch, updateFetch, createFetch, deleteFetch };
