# ⚡ Setup Rápido

## 1. Facebook Developers (5 minutos)

```
1. https://developers.facebook.com/apps/
2. Selecione seu app
3. Adicione "Facebook Login"
4. Facebook Login > Settings:
   - Valid OAuth Redirect URIs:
     http://localhost:3000/api/auth/callback/facebook
   - Ative: Client OAuth Login ✅
   - Ative: Web OAuth Login ✅
5. Settings > Basic:
   - Copie App ID
   - Copie App Secret
```

## 2. Configure .env.local

```bash
cp env.example .env.local
```

Cole suas credenciais:

```env
FACEBOOK_CLIENT_ID="seu_app_id"
FACEBOOK_CLIENT_SECRET="seu_app_secret"
```

## 3. Rode

```bash
npm install
npm run prisma:migrate
npm run dev
```

Acesse: http://localhost:3000

---

**Pronto!** O login com Facebook já está funcionando.

Para publicar no Instagram depois, você precisará:

- Conta Instagram Business/Creator
- Conectada a uma Página do Facebook
- Solicitar permissões no App Review
