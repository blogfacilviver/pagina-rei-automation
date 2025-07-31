# 📦 Página Rei Automation – Codex Workflow Builder

Este repositório é usado como **base de referência para o OpenAI Codex** gerar automaticamente:

✅ **workflow.json** → Workflow completo para importação no n8n.  
✅ **lambda-proxy.js** → Função AWS Lambda Proxy em Node.js para integrar com a Amazon PA-API 5.0 (SearchItems e GetItems).

---

## 📌 Objetivo

O repositório serve como **fonte de contexto para o Codex**, contendo a documentação técnica necessária para construir o fluxo de automação da **Página Rei**, que faz parte do blog [Fácil Viver](https://facilviver.com).

O fluxo completo:

1. Recebe um termo de busca do usuário (via Webhook).
2. Consulta produtos na Amazon usando **AWS Lambda Proxy**.
3. Gera um review dinâmico com **OpenAI API**.
4. Publica o conteúdo no WordPress via **REST API**.
5. Mantém cache de 24h para reutilizar reviews gerados.

---

## 📂 Estrutura

- **n8n_ Importação e estrutura JSON_.docx**  
  Contém boas práticas e regras de estruturação de workflows JSON no n8n.

- **Página Rei Automation Specification_.docx**  
  Documento completo com o fluxo, arquitetura, lógica de automação e integrações.

---

## 🚀 Como usar com Codex

1. Crie um ambiente no [ChatGPT Codex](https://chatgpt.com/codex).  
2. Conecte este repositório ao ambiente.  
3. Cole o **prompt detalhado fornecido no projeto**.  
4. O Codex irá gerar automaticamente **workflow.json** e **lambda-proxy.js** neste repositório.

---

## 📜 Licença

Este repositório é apenas para uso no projeto **Página Rei – Fácil Viver**.  
Você pode adaptar o conteúdo para fins educacionais ou estudos.

