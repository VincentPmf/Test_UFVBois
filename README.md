# UFV Bois - Gestion de Chargements

Application web de gestion de chargements de bois développée avec Next.js 16 et Supabase.

## 📋 Fonctionnalités

- **Gestion des chargements** : Création, affichage et suppression de chargements
- **Multi-produits** : Chaque chargement peut contenir plusieurs produits avec leurs quantités
- **Références** : Association avec des clients, transporteurs et produits
- **Interface moderne** : UI responsive avec Tailwind CSS
- **Base de données** : Supabase pour le stockage et l'authentification

## 🛠 Technologies

- **Framework** : Next.js 16 (App Router)
- **UI** : React 19 + Tailwind CSS 4
- **Backend** : Supabase (PostgreSQL + Auth)
- **Language** : TypeScript
- **Styling** : Tailwind CSS avec PostCSS

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


---

## ⚙️ Configuration

### 1. Prérequis

- Node.js 18+ installé
- Compte [Supabase](https://supabase.com) (gratuit)

### 2. Installation

```bash
# Clone le repository
git clone https://github.com/VincentPmf/Test_UFVVBois.git
cd test_ufv_bois
```

# Installe les dépendances
```
npm install
```

### 3. Créer un projet Supabase

- Créer un nouveau projet : [supabase.com](https://supabase.com)
- Noter l'URL dans une variable d'environnement `NEXT_PUBLIC_SUPABASE_URL`


**Création des tables** :
```
-- Table clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table transports
CREATE TABLE transports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table produits
CREATE TABLE produits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table chargements
CREATE TABLE chargements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  transport_id UUID REFERENCES transports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table chargement_produits (relation N-N)
CREATE TABLE chargement_produits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chargement_id UUID REFERENCES chargements(id) ON DELETE CASCADE,
  produit_id UUID REFERENCES produits(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_chargements_client ON chargements(client_id);
CREATE INDEX idx_chargements_transport ON chargements(transport_id);
CREATE INDEX idx_chargement_produits_chargement ON chargement_produits(chargement_id);

```

### 4. Variables d'environnement
Crée un fichier .env.local à la racine du projet :
```
NEXT_PUBLIC_SUPABASE_URL=https://ton-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta-cle-anon-publique
```

Où trouver ces clés ?

Dashboard Supabase → Settings → API
Project URL → `NEXT_PUBLIC_SUPABASE_URL`
anon public → NEXT_PUBLIC_SUPABASE_ANON_KEY`



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Auteur
- [Vincent CAUSSE](https://github.com/VincentPmf)


