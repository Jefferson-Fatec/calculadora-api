const express = require('express');
const app = express();

// Isso é crucial para o Express entender o JSON enviado no corpo (body) da requisição
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Rota principal da calculadora
 * Vamos usar o método POST, pois estamos enviando dados (números e operação)
 * A rota será /calculate
 */
app.post('/calculate', (req, res) => {
  // Pegamos os dados do corpo (body) da requisição
  const { num1, num2, operation } = req.body;

  // Validação básica
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'num1 e num2 devem ser números.' });
  }

  let result;

  switch (operation) {
    case 'adicao':
    case '+':
      result = num1 + num2;
      break;
    case 'subtracao':
    case '-':
      result = num1 - num2;
      break;
    case 'multiplicacao':
    case '*':
      result = num1 * num2;
      break;
    case 'divisao':
    case '/':
      if (num2 === 0) {
        return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Operação inválida. Use "adicao", "subtracao", "multiplicacao" ou "divisao".' });
  }

  // Se tudo deu certo, retornamos o resultado
  res.status(200).json({ result: result });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor da calculadora rodando na porta ${PORT}`);
});