# Arquitetura da Landing Page Podo360

## Objetivo

A Landing Page da Podo360 é o ponto público de venda e captação de interesse. Ela fica separada do Sistema Clínica e do Sistema Admin.

## Integrações futuras

```text
podo360-landing -> API/Edge Function -> platform_leads -> podo360-admin
```

## Segurança

- Não usar `service_role` no frontend.
- Não consultar dados clínicos.
- Não listar leads.
- Validar o formulário antes de enviar.
- Aplicar proteção contra spam na API futura.

## Conteúdo

- Hero institucional.
- Benefícios.
- Módulos do produto.
- Demonstração.
- Formulário de lead.
- Botões comerciais.
- FAQ.
- Rodapé.
