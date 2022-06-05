import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import {Toaster} from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  
  return (
    <>
      {pathname === "/login" || pathname === "/signup" ? null : <Sidebar />}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
