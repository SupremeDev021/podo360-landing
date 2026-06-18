# Podo360 Landing

Landing Page comercial da Podo360 para apresentação institucional, captação de leads e direcionamento para o Sistema Clínica.

## Responsabilidade

Este repositório é público/comercial e não deve acessar dados clínicos.

Ele pode:

- Apresentar a Podo360.
- Captar leads.
- Direcionar para WhatsApp comercial.
- Direcionar para o login do Sistema Clínica.
- Preparar seção futura de planos, sem preços definitivos.

Ele não pode:

- Consultar dados clínicos.
- Consultar empresas contratantes.
- Listar leads.
- Usar `service_role` no frontend.
- Armazenar chaves reais no código.

## Variáveis de ambiente

Crie `.env` a partir de `.env.example`:

```bash
VITE_APP_URL=
VITE_CLINIC_APP_URL=
VITE_LEAD_CAPTURE_ENDPOINT=
VITE_WHATSAPP_URL=
```

`VITE_LEAD_CAPTURE_ENDPOINT` será a API/Edge Function futura para criar leads.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Próximos passos

1. Criar o repositório remoto `SupremeDev021/podo360-landing`.
2. Conectar este projeto ao remote.
3. Definir domínio comercial.
4. Criar API/Edge Function de leads.
5. Conectar leads ao futuro `podo360-admin`.
