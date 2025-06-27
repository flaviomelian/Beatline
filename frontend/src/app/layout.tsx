import "./globals.css";
import Header from "./Components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children} {/* Aquí Next.js pone el contenido de cada página */}
      </body>
    </html>
  );
}