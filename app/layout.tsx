import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleReCaptchaProvider } from "@/utils/libs/google-recaptcha";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contact Form"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined
          }}
        >
          {children}
          <ToastContainer />
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
