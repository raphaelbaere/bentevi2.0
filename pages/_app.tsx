import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import Layout from '@/components/Layout'
import LoginModel from '@/components/models/LoginModel'
import RegisterModel from '@/components/models/RegisterModel'
import '@/styles/globals.css'
import EditModel from '@/components/models/EditModel';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModel />
      <RegisterModel />
      <LoginModel />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
