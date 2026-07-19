import { createRoot } from 'react-dom/client';
import App from './App';
// Tailwind base is not needed — site.css handles all styles
// We keep index.css only for Tailwind tooling compatibility
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
