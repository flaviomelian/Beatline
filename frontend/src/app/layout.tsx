import "./globals.css";
import Header from "./Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:slnt,wght@-8,235&display=swap"
          rel="stylesheet"/>
      </head>
      <body>
        <Header />
        {children} {/* Aquí Next.js pone el contenido de cada página */}
      </body>
    </html>
  );
}
