
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";

import SEO from "@/components/SEO";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
<SEO />
<ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  
</>);
}
