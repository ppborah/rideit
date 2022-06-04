import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  
  return (
    <>
      {pathname === "/login" || pathname === "/signup" ? null : <Sidebar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
