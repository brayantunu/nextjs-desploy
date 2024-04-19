
import "./globals.css";
import Providers from './providers'
import Navbarr from "@/components/navbar";
import  {AuthProvider}  from "./api/users/route";
export const metadata = {
  title: "Create Note App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, pageProps}) {

  return (
    <html lang="es" className=" bg-bg-blue">
      <body >
        <Providers>
          <AuthProvider>
            <Navbarr style={{ zIndex: 1000 }} {...pageProps}/>
            {children} 
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
