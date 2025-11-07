'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type ProductLine = {
  produitId: string;
  quantity: number;
};

export async function createChargementAction(formData: FormData) {
  const clientId = formData.get('clientId') as string;
  const transportId = formData.get('transportId') as string;

  if (!clientId || !transportId) {
    throw new Error('Client et transporteur sont obligatoires.');
  }

  const lignesRaw = formData.getAll('produits'); // ex: ["prodId|3", "prodId2|5"]
  const lignes: ProductLine[] = lignesRaw
    .map((v) => {
      if (typeof v !== 'string') return null;
      const [produitId, qtyStr] = v.split('|');
      const quantity = parseInt(qtyStr, 10);
      if (!produitId || isNaN(quantity) || quantity <= 0) return null;
      return { produitId, quantity };
    })
    .filter(Boolean) as ProductLine[];

  if (lignes.length === 0) {
    throw new Error('Au moins un produit est requis.');
  }

  const supabase = await createClient();

  const { data: chargement, error: errChargement } = await supabase
    .from('chargements')
    .insert({ client_id: clientId, transport_id: transportId })
    .select('id')
    .single();

  if (errChargement || !chargement) {
    console.error(errChargement);
    throw new Error("Erreur lors de la création du chargement.");
  }

  const chargementId = chargement.id as string;

  const { error: errProduits } = await supabase
    .from('chargement_produits')
    .insert(
      lignes.map((l) => ({
        chargement_id: chargementId,
        produit_id: l.produitId,
        quantity: l.quantity,
      }))
    );

  if (errProduits) {
    console.error(errProduits);
    throw new Error(
      "Chargement créé mais erreur lors de l'ajout des produits."
    );
  }

  redirect('/chargements');
}

export async function deleteChargementAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('chargements')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Erreur lors de la suppression du chargement.");
  }
}