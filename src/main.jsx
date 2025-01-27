import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from './store/store.js'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ChakraProvider value={defaultSystem}>
    <App />
    </ChakraProvider>
    </Provider>

  </StrictMode>,
)
