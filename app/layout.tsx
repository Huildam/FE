import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReactQueryProvider from "./_providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "후일담",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Toaster position="bottom-center" />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
