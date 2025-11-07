// app/chargements/page.tsx
import { createClient } from '@/utils/supabase/server';
import {
  AddButton,
} from '../components/items';
import { DeleteChargementButton } from './DeleteChargementButton';

export default async function ChargementsPage() {
  const supabase = await createClient();
  const [{ data: chargements }, { data: clients }, { data: transports }, { data: produits }] =
    await Promise.all([
      supabase.from('chargements').select(),
      supabase.from('clients').select('id, name').order('name'),
      supabase.from('transports').select('id, name').order('name'),
      supabase.from('produits').select('id, name').order('name'),
    ]);
  const clientMap = Object.fromEntries(
    (clients ?? []).map((c) => [c.id, c.name])
  );
  const transportMap = Object.fromEntries(
    (transports ?? []).map((t) => [t.id, t.name])
  );
  const produitMap = Object.fromEntries(
    (produits ?? []).map((p) => [p.id, p.name])
  );

  return (
    <main className="max-w-2xl mx-auto mt-10 border rounded-xl shadow-sm bg-white">
      <header className="flex items-center justify-between mb-6  w-full border-b pb-3 p-6">
        <h1 className="text-2xl font-bold">Chargements</h1>
        <AddButton
          clients={clients ?? []}
          transports={transports ?? []}
          produits={produits ?? []}
        />
      </header>
      <div className="p-6 space-y-3">
        {!chargements || chargements.length === 0 ? (
          <p>Aucun chargement enregistré.</p>
        ) : (
          chargements.map((c) => (
            <div
              key={c.id}
              className="border rounded-md p-3 flex items-center justify-between"
            >
              <div>
                <div className="text-xs text-gray-500">
                  {new Date(c.created_at).toLocaleString('fr-FR')}
                </div>
                <div className="text-sm font-medium">
                  Client : {clientMap[c.client_id] ?? '—'}
                </div>
                <div className="text-sm">
                  Transporteur : {transportMap[c.transport_id] ?? '—'}
                </div>
              </div>

              {/* bouton supprimer ici */}
              <DeleteChargementButton id={c.id} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}