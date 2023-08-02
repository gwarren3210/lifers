'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from '../cmp/navbar'
import LandingPage from '../cmp/landingPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#52796f',
    },
    secondary: {
      main: '#84a98c',
    },
  },
});

export default function Home() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar key='home' />
        <main className="flex min-h-screen flex-col items-center p-24">
           <LandingPage />
        </main>
      </ThemeProvider>
    </div>
  )
}