import type { Metadata } from "next";
import './globals.css'
import { Inter } from 'next/font/google'
import { NavLink } from '@/components/NavLink'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Food Planner</h1>
        </div>
        <nav className="mt-4">
          <NavLink href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Meals</NavLink>
          <NavLink href="/ideas" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Ideas</NavLink>
          <NavLink href="/sides" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Sides</NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
    </body>
    </html>
  )
}