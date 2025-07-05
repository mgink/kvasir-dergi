import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { CartProvider } from "@/lib/CartContext";
import { OrderProvider } from "@/lib/OrderContext";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Kvasir Dergi - Edebiyat, Sanat ve Kültür",
  description: "Türkiye'nin önde gelen edebiyat, sanat ve kültür dergisi. En güncel sayıları ve arşivi keşfedin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="d-flex flex-column min-vh-100">
        <ToastProvider>
          <OrderProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-grow-1">
                {children}
              </main>
              <Footer />
              <BackToTop />
            </CartProvider>
          </OrderProvider>
        </ToastProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          async
        ></script>
      </body>
    </html>
  );
}
