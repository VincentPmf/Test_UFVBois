// components/NewChargementDialog.tsx
'use client';

type Props = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode; // on pourra y mettre le formulaire après
};

export function NewChargementDialog({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 p-2 text-gray-500 cursor-pointer hover:text-black hover:bg-gray-200 rounded-full  duration-150"
        >
            <img
                src="/close-icon.svg"
                alt="Fermer"
                className="w-3 h-3"
            />
        </button>
        <h2 className="text-xl font-semibold mb-4">Nouveau chargement</h2>
        {children}
      </div>
    </div>
  );
}