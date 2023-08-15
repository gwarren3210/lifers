'use client';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import supabase from '../../supabase'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

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

export const metadata: Metadata = {
  title: 'Liferss',
  description: 'Connect with your liferss',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <ThemeProvider theme={theme}>
      <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  )
}
