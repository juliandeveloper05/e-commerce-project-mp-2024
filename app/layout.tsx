import './ui/global.css';
import { montserrat } from './ui/fonts';
import Navbar from './components/navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
