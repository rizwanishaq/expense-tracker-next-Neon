import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense-Tracker",
  description: "Track your expenses and balance",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container">
        {children}
        </main>
        <ToastContainer />
        </body>
    </html>
    </ClerkProvider>
  );
}
