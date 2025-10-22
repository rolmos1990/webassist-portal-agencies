import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { setupWorker } from 'msw/browser';
import { getWacApiMock } from '../src/api/generated.msw'; // nombre según tu target

export const worker = setupWorker(...getWacApiMock());


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.tsx';
import i18n from './i18n/i18n';
import { I18nBootstrap } from './i18n/i18nBootstrap';
import { I18nCacheProvider } from './i18n/i18nCacheProvider';
import ToastProvider from './components/UI/ToastProvider';

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

async function enableMocksIfNeeded() {
  if (import.meta.env.VITE_API_MOCKS === 'on') {
    await worker.start({
      onUnhandledRequest: 'bypass', // requests no mockeadas pasan a la API real
    });
    console.log('%c[MSW] Mock API ENABLED ✅', 'color: green; font-weight: bold;');
  } else {
    console.log('%c[MSW] Mock API DISABLED 🚀', 'color: orange; font-weight: bold;');
  }
}

if (import.meta.env.DEV) {
  await enableMocksIfNeeded();
}

createRoot(document.getElementById('root')!).render(
    <I18nextProvider i18n={i18n}>
    <I18nCacheProvider i18n={i18n} initialLang="es">
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <I18nBootstrap /> 
        <App />
      </QueryClientProvider>
    </I18nCacheProvider>
    </I18nextProvider>
);
