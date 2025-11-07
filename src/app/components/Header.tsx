// src/app/components/Header.tsx
import Image from 'next/image';

export function Header() {
  return (
    <header
      className="w-full flex items-center gap-4 shadow-md"
      style={{ backgroundColor: '#6aa81e' }}
    >
    <div className="px-6 py-4 bg-white">
        <a href="https://sud-bois.fr/?srsltid=AfmBOoqcUjehY05YlC2sQ7cH30DQNZssuZuPGmQDJ_IOshQ8OcSpmQWF">
                <Image
                    src="/sud-bois-logo-16729956341.jpg.png"
                    alt="Sud Bois"
                    className="h-12 cursor-pointer"
                    width={130}
                    height={59}
                />
        </a>
    </div>
      <h1 className="text-white text-xl font-bold">
        UFV Bois
      </h1>
    </header>
  );
}