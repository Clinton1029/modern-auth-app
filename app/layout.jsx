import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Modern Auth App",
  description: "Premium Next.js authentication frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
