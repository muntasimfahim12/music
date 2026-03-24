import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer"; 
import { CartProvider } from "../../context/CartContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}