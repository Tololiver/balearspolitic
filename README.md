# BalearsPolitic

Plataforma de referència per a l'anàlisi política de les Illes Balears.

**Stack:** React 18 + Vite + Tailwind CSS + Supabase + Netlify

---

## Setup en 5 passos

### 1. Clona el repositori i instal·la dependències

```bash
git clone https://github.com/toloolliver/balearspolitic.git
cd balearspolitic
npm install
```

### 2. Crea el projecte Supabase

1. Ves a [supabase.com](https://supabase.com) i crea un nou projecte
2. Obre el **SQL Editor** i executa:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed/seed_data.sql`
3. A **Authentication > Providers**, habilita **Google OAuth**
4. Afegeix `http://localhost:5173/admin` i `https://balearspolitic.cat/admin` als **Redirect URLs**

### 3. Configura les variables d'entorn

```bash
cp .env.example .env.local
```

Edita `.env.local`:
```
VITE_SUPABASE_URL=https://XXXXXXXXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_ADMIN_EMAIL=tolo@balearspolitic.cat
```

Les trobes a: **Supabase Dashboard > Settings > API**

### 4. Executa en local

```bash
npm run dev
# → http://localhost:5173         (pàgina pública)
# → http://localhost:5173/admin   (CMS admin)
```

### 5. Deploy a Netlify

```bash
# Connecta el repo a Netlify (o drag&drop del build)
npm run build
# → dist/ (puja a Netlify o configura autodeploy des de GitHub)
```

A Netlify:
- **Site settings > Build & deploy**: Build command `npm run build`, Publish directory `dist`
- **Environment variables**: afegeix les mateixes 3 variables del `.env.local`
- **Domain management**: afegeix `balearspolitic.cat`

---

## Estructura del projecte

```
src/
├── lib/supabase.js          # Client Supabase singleton
├── hooks/useData.js         # Tots els hooks de dades (React Query)
├── styles/global.css        # CSS global + Tailwind
├── App.jsx                  # Routing principal
├── main.jsx                 # Entry point
├── components/
│   ├── layout/
│   │   ├── Header.jsx       # Capçalera amb stats del parlament
│   │   ├── NavTabs.jsx      # Navegació principal
│   │   └── Footer.jsx       # Peu de pàgina
│   ├── ui/index.jsx         # Components reutilitzables (SeatsBar, Badge, etc.)
│   └── sections/
│       ├── Comparativa.jsx  # PP vs PSOE (contingut fix)
│       ├── Partits.jsx      # Fitxes de partits (dades Supabase)
│       ├── Comparador.jsx   # Comparador interactiu
│       ├── Programes.jsx    # Programes electorals 2015/2019/2023
│       ├── Pobles.jsx       # Municipis amb cerca i filtres
│       ├── Elect27.jsx      # Eleccions 2027
│       ├── Governs.jsx      # Cronologia governs 1983–
│       └── Fonts.jsx        # Fonts consultades
└── admin/
    ├── AdminLayout.jsx      # Layout admin + auth Google OAuth
    ├── AdminPartits.jsx     # CRUD partits
    ├── AdminPobles.jsx      # CRUD municipis
    ├── AdminGoverns.jsx     # CRUD governs
    └── AdminProgrames.jsx   # CRUD programes electorals

supabase/
├── migrations/
│   └── 001_initial_schema.sql  # Schema complet PostgreSQL + RLS
└── seed/
    └── seed_data.sql           # Dades inicials (partits, consells)
```

---

## Seccions del CMS Admin (`/admin`)

| Ruta                  | Funció                              |
|-----------------------|-------------------------------------|
| `/admin`              | Dashboard general                   |
| `/admin/partits`      | CRUD partits + posicions temàtiques |
| `/admin/pobles`       | CRUD tots 67 municipis              |
| `/admin/governs`      | CRUD governs 1983–avui              |
| `/admin/programes`    | CRUD programes electorals           |

**Accés**: Google OAuth. Només l'email definit a `VITE_ADMIN_EMAIL` pot escriure.

---

## Afegir nous municipis

Des del CMS (`/admin/pobles`) o directament via Supabase:

```sql
insert into municipis (nom, illa, poblacio, alcalde, govern_parti, color_govern, regidors, total_regidors, context)
values ('Campos', 'Mallorca', 11000, 'Sebastià Sureda (PP)', 'pp', '#0e2a6e',
        '[{"p":"PP","n":8,"color":"#0e2a6e"},{"p":"PSIB-PSOE","n":5,"color":"#b82012"},{"p":"Mes","n":2,"color":"#1a5c30"}]',
        17, 'PP governa Campos en minoria.');
```

---

## Roadmap

- [x] Fase 1: React/Vite + Supabase + Admin bàsic
- [ ] Fase 2: Design system complet (Fraunces + IBM Plex Mono)
- [ ] Fase 2: CMS amb editor ric (Tiptap)
- [ ] Fase 2: Consells insulars (secció completa)
- [ ] Fase 2: SEO + Open Graph per a cada secció
- [ ] Fase 3: API pública, subscripcions, chatbot polític

---

## Un projecte de Tolo Oliver · Deacorde Studio · 2026
