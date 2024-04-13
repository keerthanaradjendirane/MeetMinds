import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetMinds",
  description: "Video Calling App",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout:{
          logoImageUrl:'/icons/yoom-logo.svg',
          socialButtonsVariant:'iconButton'
        },
        variables:{
          colorText:'#fff',
          colorPrimary: '#0E78F9',
          colorBackground:'#1c1f2e',
          colorInputBackground:'#252a41',
          colorInputText:'#fff'
        }
      }}>
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster />
        <link rel='stylesheet' href='https://bots.kore.ai/webclient/UI/dist/kore-ai-sdk.min.css'></link>
<script src='https://bots.kore.ai/api/platform/websdkjs/1502dc87208e4a86853487a5fd51039dd749776d6b5047cd8f385c21254f7d22st32'></script>
<script>KoreSDK.show(KoreSDK.chatConfig);</script>
        </body>
      </ClerkProvider>
    </html>
  );
}
