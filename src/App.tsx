import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="@pizzashop/theme" defaultTheme="dark">
        <Toaster richColors />
        <Helmet titleTemplate="%s | Pizza Shop" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
