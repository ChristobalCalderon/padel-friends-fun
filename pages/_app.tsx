import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import "../styles/vars.css";
import "../styles/global.css";

export default function App({ Component, pageProps, router }: AppProps) {
  // optionally pass the 'user' prop from pages that require server-side
  // rendering to prepopulate the 'useUser' hook.

  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <AnimatePresence initial={false} mode="wait">
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </UserProvider>
  );
}
