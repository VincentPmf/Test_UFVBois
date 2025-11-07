'use client';
import { useState } from 'react';
import {
  NewChargementDialog,
  NewChargementForm
} from '../components/items';


type Option = { id: string; name: string };
type Props = {
  clients: Option[];
  transports: Option[];
  produits: Option[];
};

export default function AddButton({ clients, transports, produits }: Props) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <button
        className="px-3 py-1 text-sm rounded-md border hover:bg-gray-100 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        ➕ Nouveau
      </button>


      <NewChargementDialog open={isOpen} onClose={() => setIsOpen(false)}>
        <NewChargementForm
          clients={clients}
          transports={transports}
          produits={produits}
          onSuccess={() => setIsOpen(false)}
        />
      </NewChargementDialog>
    </>
  );
}

