'use client';
import { useEffect, useState } from 'react';

export function ClientDate({ date }: { date: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-xs text-gray-500">Chargement...</span>;
  }

  return (
    <span className="text-xs text-gray-500">
      {new Date(date).toLocaleString('fr-FR')}
    </span>
  );
}