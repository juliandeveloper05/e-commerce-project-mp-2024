import './ui/global.css';
import { lusitana } from './ui/fonts';
import Navbar from './components/navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
