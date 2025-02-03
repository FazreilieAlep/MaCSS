import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css';
import Routing from './routes';
import { AuthProvider } from './context/AuthContext';
import './index.css';

export default function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);