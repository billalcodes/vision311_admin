"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Admin Portal</title>
        <link
          rel="icon"
          href="/images/logo/logo.png"
        />
 <script dangerouslySetInnerHTML={{ __html: `
    (function(w,d,s,pc){
      pc.projectId = "lawfirm-6675be4f-49e8-4624-801b-0a4162439424";
      w.PrecisionConversionsConfig = pc;
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s);
      j.async=true;
      j.src="https://lh8llf3eu0.execute-api.us-east-1.amazonaws.com/v2/script/" + pc.projectId;
      f.parentNode.insertBefore(j,f);
    })(window,document,"script",{});
  ` }} />
      </head>
      <body suppressHydrationWarning={true}>
        {loading ? <Loader /> : children}
      </body>
    </html>
  );
}
