import './globals.css';
import {
  Header,
  Footer
} from './components/items';

export const metadata = {
  title: 'Chargements',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
        <body className="bg-gray-50 text-gray-900 h-full  flex flex-col justify-between">
          <Header />
            <main className="flex-1">
              {children}
            </main>
          <Footer />
        </body>
    </html>
  );
}