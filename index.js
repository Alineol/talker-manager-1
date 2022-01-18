const express = require('express');
const bodyParser = require('body-parser');
const { readContentFile, writeContentFile } = require('./editApi');
const { isEmailValid, isPasswordValid } = require('./validations/login-validation');
const { isTokenValid, isNameValid,
  isAgeValid, isTalkValid } = require('./validations/createTalker-validation');

const TALKERS_JSON = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readContentFile(TALKERS_JSON);
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
    const talkers = await readContentFile(TALKERS_JSON);
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

app.post('/talker', isTokenValid, isNameValid, isAgeValid,
  isTalkValid, async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readContentFile(TALKERS_JSON);
    const newTalker = { id: talkers.length + 1, name, age, talk };
    
    const newTalkers = await writeContentFile(TALKERS_JSON, newTalker);

    res.status(201).json(newTalkers);
});

app.put('/talker/:id', isTokenValid, isNameValid, isAgeValid,
  isTalkValid, async (req, res) => {
    const { name, age, talk } = req.body;
    const { id } = req.params;
    const talkers = await readContentFile(TALKERS_JSON);
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
    const editedtalker = talkers[talkerIndex];
    editedtalker.name = name;
    editedtalker.age = age;
    editedtalker.talk = talk;
    talkers[talkerIndex] = editedtalker;
    const newTalkers = await writeContentFile(TALKERS_JSON, talkers[talkerIndex]);

    res.status(200).json(newTalkers);
  });

app.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});
