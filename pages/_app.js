import "@/styles/globals.css";
import { NavBar, Card } from "../components/components";
import { ICOProvider } from "../context/ICOContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ICOProvider>
        <NavBar />
        <Component {...pageProps} />
      </ICOProvider>
    </div>
  );
}
