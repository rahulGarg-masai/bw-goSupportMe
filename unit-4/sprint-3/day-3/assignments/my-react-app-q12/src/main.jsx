import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import store from './redux/store';
import './index.css';
import App from './App.jsx';

// Extend the Chakra UI theme for custom styles if needed
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6f1ff',
      100: '#b8d4ff',
      200: '#80b3ff',
      300: '#4d91ff',
      400: '#2673ff',
      500: '#0052cc',
      600: '#0047b3',
      700: '#003b99',
      800: '#002e80',
      900: '#001f59',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue',
        size: 'md',
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>,
)
