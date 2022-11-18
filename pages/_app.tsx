import { UserProvider } from '@auth0/nextjs-auth0'
import { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'

export default function App({ Component, pageProps } : AppProps) {
  // optionally pass the 'user' prop from pages that require server-side
  // rendering to prepopulate the 'useUser' hook.

  const { user } = pageProps

  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  )
}
