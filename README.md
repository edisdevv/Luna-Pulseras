# Piedra & Hilo — Tienda de pulseras artesanales

Proyecto en **Next.js 14 + TypeScript + Tailwind CSS**, con:
- **Supabase**: cuentas (login por enlace mágico, sin perfil) + fotos de productos (Storage) + base de datos.
- **Flow**: pasarela de pago chilena.
- Catálogo con pulseras que se agrandan al hacer clic, carrito y despacho solo en Concepción.

## 1. Requisitos previos

- [Node.js 18 o superior](https://nodejs.org/) instalado (incluye `npm`).
- Una cuenta en [Supabase](https://supabase.com) (plan gratuito sirve).
- Una cuenta de comercio en [Flow](https://www.flow.cl) (puedes partir en modo sandbox/pruebas).
- Una cuenta en [GitHub](https://github.com) (o GitLab) para el repositorio.

## 2. Instalar las dependencias

Descomprime el proyecto, entra a la carpeta y ejecuta:

```bash
cd pulseras-shop
npm install
```

Esto instala Next.js, React, Tailwind, TypeScript y el cliente de Supabase (todo ya está definido en `package.json`).

## 3. Configurar Supabase

1. Entra a [supabase.com](https://supabase.com) → **New project**. Elige nombre, contraseña de base de datos y región (idealmente la más cercana, ej. São Paulo).
2. Cuando el proyecto esté listo, ve a **Project Settings → API** y copia:
   - `Project URL`
   - `anon public` key
   - `service_role` key (¡es secreta, nunca la subas a git ni la pongas en el frontend!)
3. Ve a **SQL Editor → New query**, pega el contenido de `supabase/schema.sql` de este proyecto y presiona **Run**. Esto crea las tablas `productos` y `ordenes` con sus reglas de seguridad (RLS).
4. Ve a **Storage → New bucket**, créalo con el nombre `productos` y marca la opción **Public bucket** (así las fotos se pueden mostrar en la web sin login).
5. Sube tus fotos de pulseras a ese bucket. Haz clic en cada archivo subido y copia su **URL pública**.
6. Ve a `supabase/ejemplo-productos.sql`, cambia los datos por los de tu pulsera real (nombre, precio, tipo de piedra, la URL de la foto que copiaste) y ejecútalo en el SQL Editor. Repite por cada pulsera. También puedes hacerlo a mano desde **Table Editor → productos → Insert row**, sin usar SQL.
7. Ve a **Authentication → Providers**, confirma que **Email** esté habilitado (es el método usado para el login por enlace mágico).
8. Ve a **Authentication → URL Configuration** y agrega la URL de tu sitio (por ejemplo `http://localhost:3000` para desarrollo, y luego la URL real cuando lo publiques) en **Redirect URLs**.

## 4. Configurar Flow

1. Crea una cuenta de comercio en [flow.cl](https://www.flow.cl) (o usa el ambiente sandbox en [sandbox.flow.cl](https://sandbox.flow.cl) para probar sin cobrar de verdad).
2. Ve a la sección de **API / Integraciones** dentro de tu panel de Flow y copia tu `API Key` y `Secret Key`.
3. Mientras pruebas, usa `FLOW_API_URL=https://sandbox.flow.cl/api`. Cuando ya quieras cobrar de verdad, cambia a `FLOW_API_URL=https://www.flow.cl/api` y usa las llaves de producción.

## 5. Variables de entorno

Copia el archivo de ejemplo y complétalo con tus datos:

```bash
cp .env.local.example .env.local
```

Edita `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

FLOW_API_KEY=tu-api-key
FLOW_SECRET_KEY=tu-secret-key
FLOW_API_URL=https://sandbox.flow.cl/api

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env.local` nunca se sube a git (ya está en `.gitignore`).

## 6. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Deberías ver la página de inicio, el catálogo (con las pulseras que subiste a Supabase), el carrito y el checkout.

> Nota sobre Flow en desarrollo local: Flow necesita poder llamar a tu `urlConfirmation` (el webhook `/api/flow/confirmacion`) desde internet, así que en `localhost` esa llamada no llegará. Para probar el flujo de pago completo en desarrollo, usa una herramienta como [ngrok](https://ngrok.com) para exponer tu `localhost:3000` con una URL pública y ponla en `NEXT_PUBLIC_SITE_URL` mientras pruebas. Al publicar el sitio (paso 8) esto ya funciona solo.

## 7. Crear el repositorio y conectarlo

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Proyecto inicial: tienda de pulseras Piedra & Hilo"
```

Crea un repositorio nuevo y vacío en GitHub (sin README, sin .gitignore, para no chocar con lo que ya tienes): entra a [github.com/new](https://github.com/new), ponle un nombre (ej. `pulseras-shop`) y presiona **Create repository**.

GitHub te mostrará comandos parecidos a estos (reemplaza `tu-usuario`):

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/pulseras-shop.git
git push -u origin main
```

Con eso tu proyecto queda conectado y subido a GitHub.

## 8. Publicar el sitio (recomendado: Vercel)

1. Entra a [vercel.com](https://vercel.com) y conecta tu cuenta de GitHub.
2. **Add New → Project**, elige el repositorio `pulseras-shop`.
3. En **Environment Variables**, agrega las mismas variables del paso 5 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `FLOW_API_KEY`, `FLOW_SECRET_KEY`, `FLOW_API_URL`, `NEXT_PUBLIC_SITE_URL` con la URL final que te dará Vercel, ej. `https://pulseras-shop.vercel.app`).
4. Presiona **Deploy**. Cuando termine, vuelve a Supabase → Authentication → URL Configuration y agrega esa URL final como Redirect URL.
5. Cambia `FLOW_API_URL` a producción (`https://www.flow.cl/api`) cuando quieras cobrar de verdad.

## 9. Estructura del proyecto

```
pulseras-shop/
├── src/
│   ├── app/
│   │   ├── page.tsx                 → Inicio
│   │   ├── layout.tsx               → Layout raíz (fuentes, Navbar, providers)
│   │   ├── globals.css              → Estilos globales de Tailwind
│   │   ├── catalogo/page.tsx        → Catálogo de pulseras
│   │   ├── consultas/page.tsx       → Preguntas frecuentes + contacto
│   │   ├── carrito/page.tsx         → Carrito de compras
│   │   ├── checkout/page.tsx        → Dirección (solo Concepción) + pago
│   │   ├── login/page.tsx           → Inicio de sesión (enlace mágico)
│   │   ├── pago/retorno/route.ts    → Flow redirige aquí tras el pago
│   │   ├── pago/confirmacion/page.tsx → Pantalla final para el cliente
│   │   └── api/
│   │       ├── productos/route.ts        → Lista productos desde Supabase
│   │       ├── ordenes/route.ts          → Crea la orden + orden de pago en Flow
│   │       └── flow/confirmacion/route.ts → Webhook de confirmación de Flow
│   ├── components/
│   │   ├── Navbar.tsx           → Catálogo, Consultas, carrito y círculo de perfil
│   │   ├── ProductoCard.tsx     → Tarjeta de cada pulsera
│   │   ├── ProductoModal.tsx    → Vista ampliada + comprar/agregar al carrito
│   │   └── DivisorHilo.tsx      → Detalle decorativo (hilo con cuentas)
│   ├── context/
│   │   ├── CarritoContext.tsx   → Estado global del carrito (localStorage)
│   │   └── AuthContext.tsx      → Sesión de Supabase
│   ├── lib/
│   │   ├── supabaseClient.ts    → Cliente Supabase (navegador)
│   │   ├── supabaseAdmin.ts     → Cliente Supabase (servidor, service role)
│   │   ├── flow.ts              → Firma y llamadas a la API de Flow
│   │   └── constantes.ts        → Sectores de Concepción habilitados, textos
│   └── types/index.ts           → Tipos de Producto, Orden, Dirección, etc.
├── supabase/
│   ├── schema.sql                → Tablas + seguridad (ejecutar una vez)
│   └── ejemplo-productos.sql     → Ejemplo para cargar pulseras
├── .env.local.example
├── tailwind.config.ts
└── package.json
```

## 10. Cómo funciona el flujo de compra

1. El cliente entra a **Catálogo**, hace clic en una pulsera → se agranda en un modal.
2. Puede **Agregar al carrito** (sigue viendo el catálogo) o **Comprar ahora** (va directo a `checkout`).
3. En **Checkout**, ingresa su dirección. El **sector** solo puede ser uno de la lista de Concepción (`src/lib/constantes.ts`); si intentan forzar otro valor por fuera del formulario, la API `/api/ordenes` lo rechaza igual.
4. Se crea la orden en Supabase (`estado: pendiente_pago`) y se genera una orden de pago en Flow; el cliente es redirigido a la pasarela de Flow para pagar.
5. Flow confirma el pago llamando a `/api/flow/confirmacion` (servidor a servidor) y además redirige al cliente a `/pago/retorno` → `/pago/confirmacion`, donde ve el resultado y se vacía su carrito si el pago fue exitoso.
6. Revisas tus pedidos y su estado directamente en Supabase → **Table Editor → ordenes**, y coordinas la entrega en Concepción.

## 11. Personalizar

- **Colores**: edítalos en `tailwind.config.ts` (paleta `terracota`, `cafe`, `piedra`, `dorado`, `arena`, `crema`).
- **Sectores de despacho**: `src/lib/constantes.ts` → `SECTORES_CONCEPCION`.
- **Nombre de la tienda**: `src/lib/constantes.ts` → `NOMBRE_TIENDA`.
- **Productos**: se administran 100% desde Supabase (Table Editor o SQL), no hace falta tocar código para agregar o quitar pulseras.
