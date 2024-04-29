// @/app/ui/fonts.ts
import { Lusitana } from 'next/font/google';

// Configura la fuente Lusitana
const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700'],
  // Agrega más configuraciones según sea necesario
});

// Exporta la fuente Lusitana
export { lusitana };
