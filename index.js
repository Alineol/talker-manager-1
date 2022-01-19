const express = require('express');
const bodyParser = require('body-parser');
const { 
  isEmailValid,
  isPasswordValid, 
  isTokenValid, 
  isNameValid,
  isAgeValid, 
  isTalkValid, 
} = require('./validations/validations');
const { getTalker } = require('./middlewares/getTalker');
const { getTalkerId } = require('./middlewares/getTalkerId');
const { getTalkerSearch } = require('./middlewares/getTalkerSearch');
const { postLogin } = require('./middlewares/postLogin');
const { postTalker } = require('./middlewares/postTalker');
const { putTalkerId } = require('./middlewares/putTalkerId');
const { deleteTalkerId } = require('./middlewares/deleteTalkerId');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalker);

app.get('/talker/search', isTokenValid, getTalkerSearch);

app.get('/talker/:id', getTalkerId);

app.post('/login', isEmailValid, isPasswordValid, postLogin);

app.post('/talker', isTokenValid, isNameValid, isAgeValid,
  isTalkValid, postTalker);

app.put('/talker/:id', isTokenValid, isNameValid, isAgeValid,
  isTalkValid, putTalkerId);

app.delete('/talker/:id', isTokenValid, deleteTalkerId);

app.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});
