import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/app-context";
import ErrorBoundary from "@/components/errorboundry";
import { Toaster } from "@/components/ui/toaster";

const font = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online JSON Viewer and Formatter",
  description:
    "JSON Viewer and Formatter - Efficiently view and edit JSON data with our online tool. Features include real-time visualization, syntax highlighting, and tree view for easy debugging and data manipulation.",
  authors: { url: "www.muhammad-zain.com", name: "Muhammad Zain" },
  keywords: [
    "json",
    "json viewer",
    "json editor",
    "json formatter",
    "online tool",
  ],
  robots: "index, follow",
  themeColor: "#ffffff",
  openGraph: {
    images: [
      {
        url: "https://json-viewer.muhammad-zain.com/banner.png",
        alt: "JSON Viewer Banner",
      },
    ],
    url: "https://json-viewer.muhammad-zain.com/",
    description:
      "JSON Viewer and Formatter - Efficiently view and edit JSON data with our online tool. Features include real-time visualization, syntax highlighting, and tree view for easy debugging and data manipulation.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ErrorBoundary>
          <Toaster />
          <AppProvider>{children}</AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
