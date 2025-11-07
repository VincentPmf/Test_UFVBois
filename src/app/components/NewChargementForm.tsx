'use client';

import { useState } from 'react';
import { createChargementAction } from '@/app/chargements/actions';
import { useFormStatus } from 'react-dom';

type Option = { id: string; name: string };

type Props = {
  clients: Option[];
  transports: Option[];
  produits: Option[];
  onSuccess?: () => void;
};

type LigneProduit = {
  id: string;
  produitId: string;
  quantity: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
    >
      {pending ? 'Enregistrement...' : 'Enregistrer'}
    </button>
  );
}

export function NewChargementForm({ clients, transports, produits, onSuccess }: Props) {
  const [lignes, setLignes] = useState<LigneProduit[]>([
    { id: 'ligne-1', produitId: '', quantity: 1 },
  ]);
  const [error, setError] = useState<string | null>(null);

  const addLigne = () =>
    setLignes((prev) => [
      ...prev,
      { id: `ligne-${prev.length + 1}`, produitId: '', quantity: 1 },
    ]);

  const removeLigne = (id: string) =>
    setLignes((prev) => (prev.length === 1 ? prev : prev.filter((l) => l.id !== id)));

  const updateProduit = (id: string, produitId: string) =>
    setLignes((prev) => prev.map((l) => (l.id === id ? { ...l, produitId } : l)));

  const updateQuantity = (id: string, quantity: number) =>
    setLignes((prev) => prev.map((l) => (l.id === id ? { ...l, quantity } : l)));

  async function handleAction(formData: FormData) {
    setError(null);

    lignes.forEach((l) => {
      if (!l.produitId || l.quantity <= 0) return;
      formData.append('produits', `${l.produitId}|${l.quantity}`);
    });

    try {
      await createChargementAction(formData);
      onSuccess?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue.');
    }
  }

  return (
    <form action={handleAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Client</label>
        <select name="clientId" className="border rounded-md px-2 py-1 w-full" required>
          <option value="">Sélectionner un client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Transporteur</label>
        <select name="transportId" className="border rounded-md px-2 py-1 w-full" required>
          <option value="">Sélectionner un transporteur</option>
          {transports.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Produits</label>
          <button
            type="button"
            onClick={addLigne}
            disabled={lignes.length >= produits.length}
            className={`text-sm duration-150 ${
            lignes.length >= produits.length
                ? 'text-gray-400 cursor-not-allowed'
                : 'cursor-pointer hover:underline hover:text-blue-900'
            }`}
          >
            + Ajouter un produit
          </button>
        </div>

        <div className="space-y-2">
          {lignes.map((ligne) => (
            <div key={ligne.id} className="flex gap-2 items-center">
              <select
                className="border rounded-md px-2 py-1 flex-1"
                value={ligne.produitId}
                onChange={(e) => updateProduit(ligne.id, e.target.value)}
                required
              >
                <option value="">Produit...</option>
                {produits.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={1}
                className="border rounded-md px-2 py-1 w-20"
                value={ligne.quantity}
                onChange={(e) => updateQuantity(ligne.id, Number(e.target.value))}
                required
              />
              <button
                type="button"
                onClick={() => removeLigne(ligne.id)}
                className="text-sm text-red-600 cursor-pointer hover:bg-red-100 rounded-full p-2 duration-150"
              >
                <img
                    src="/red-close-icon.svg"
                    alt="Supprimer"
                    className="w-3 h-3"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <SubmitButton />
    </form>
  );
}