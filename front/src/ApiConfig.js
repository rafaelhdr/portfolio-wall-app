// Source: https://daveceddia.com/multiple-environments-with-react/

let backendHost;

backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000';

export const API_ROOT = `${backendHost}`;
