const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile } = require('./editApi');
const { isEmailValid, isPasswordValid } = require('./validations/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readContentFile('./talker.json');
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const talkers = await readContentFile('./talker.json');
    const { id } = req.params;
    const talker = talkers.find((i) => i.id === parseInt(id, 10));
    
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

  res.status(200).json(talker);
});

app.post('/login', isEmailValid, isPasswordValid, (req, res) => {
  res.status(200).json({ token: '7mqaVRXJSp886CGr' });
});

app.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});
