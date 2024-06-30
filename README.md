## Backend: Caoportado

### Configuração Inicial

1. **Crie o arquivo .env:**

   Duplique `.env.example` renomeando a cópia para `.env`.

2. **Instale as dependências:**
   
   ```bash
   npm install
   
   docker compose up -d
   
   npx prisma migrate dev    //Atenção: Duplique `.env.example` renomeando a cópia para `.env`. A string de conexão está aqui.
   
   npm run start:dev
