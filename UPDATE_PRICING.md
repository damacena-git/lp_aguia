# Atualização de Preços

## Como atualizar valor e link do ingresso

1. Editar `src/App.tsx`:
   - Linha ~830: valor "12x de R$ XX,XX"
   - Linha ~834: link do pagamento

2. Build e deploy:
   ```bash
   npm run build
   git add .
   git commit -m "Update prices"
   git push
   ```

3. Para GitHub Pages: configure workflow ou mova `dist/index.html` para `docs/index.html`

## Últimos valores atualizados
- Data: 2026-07-06
- Valor: R$ 15,20 (12x) / R$ 182,40 à vista
- Link: https://pay.kiwify.com.br/Gs0Uxbi