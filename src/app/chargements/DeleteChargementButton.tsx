'use client';

import { useState } from 'react';
import { deleteChargementAction } from './actions';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
};

export function DeleteChargementButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!confirm('Voulez-vous vraiment supprimer ce chargement ?')) return;

    try {
      setLoading(true);
      await deleteChargementAction(id);
      // force un rafraîchissement de la liste
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-xs text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? 'Suppression...' : 'Supprimer'}
    </button>
  );
}