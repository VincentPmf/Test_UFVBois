// src/app/components/Footer.tsx
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} UFV Bois. Tous droits réservés.
        </p>
        <a
          href="https://github.com/VincentPmf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 hover:underline transition-colors"
        >
          <div className="inline-block">
            Développé par Vincent CAUSSE
            <Image
              src="/github-mark.svg"
              alt="GitHub"
              width={23}
              height={20}
              className="inline-block ml-1"
            >
            </Image>
          </div>
        </a>
      </div>
    </footer>
  );
}