# Schedule Stories - Agendador Instagram

## 🚀 Como Fazer Funcionar

### 1. Configure o Facebook Developers

1. Acesse: https://developers.facebook.com/apps/
2. Selecione seu app (ou crie um novo)
3. Adicione **"Facebook Login"**
4. Em **Facebook Login > Settings**, adicione:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
5. Ative: **Client OAuth Login** e **Web OAuth Login**
6. Em **Settings > Basic**, copie:
   - **App ID**
   - **App Secret**

### 2. Configure o .env.local

```bash
cp env.example .env.local
```

Edite `.env.local`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="BN96vzpfOLyWNFiBrFn7JRhq4VvYO0q09jGa5rTAJOY="
NEXTAUTH_URL="http://localhost:3000"
FACEBOOK_CLIENT_ID="seu_app_id_aqui"
FACEBOOK_CLIENT_SECRET="seu_app_secret_aqui"
```

### 3. Instale e Execute

```bash
npm install
npm run prisma:migrate
npm run dev
```

Acesse: http://localhost:3000

## ⚠️ Importante

**Instagram Basic Display foi descontinuada!**

Agora usa:

- Facebook Login para autenticar
- Usuários precisam de conta Instagram Business/Creator
- Instagram deve estar conectado a uma Página do Facebook

## 📦 Stack

- Next.js 16
- NextAuth.js v5 (Facebook Login)
- Prisma + SQLite
- ShadCN UI
- Tailwind CSS v4

## 🔧 Scripts

```bash
npm run dev              # Desenvolvimento
npm run build            # Build
npm run prisma:studio    # Ver banco de dados
npm run prisma:migrate   # Migrar banco
```

## 📝 Estrutura

```
app/
├── actions/          # Server actions
├── api/auth/        # AuthJS routes
├── dashboard/       # Dashboard (protegido)
└── login/           # Login page

auth.ts              # Configuração AuthJS
middleware.ts        # Proteção de rotas
```

---

**Desenvolvido com Next.js + Facebook Login + Instagram Graph API**
