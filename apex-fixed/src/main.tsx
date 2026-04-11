import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Note: StrictMode is intentionally disabled to prevent double-invocation of effects
// in development, which was causing the appearance of pages loading multiple times.
// This is a known React behavior where StrictMode double-invokes effects to catch bugs.
// For this site, we disable it to ensure smooth animations and prevent perceived reloads.

createRoot(document.getElementById('root')!).render(
  <App />,
);
