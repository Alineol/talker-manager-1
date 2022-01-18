const fs = require('fs');

const ERR_STATUS = 400;
const ERR_STATUS_TOKEN = 401;
const SUCCESS_STATUS = 201;

const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(ERR_STATUS_TOKEN).send({ message: 'Token não encontrado' });
  }

  if (authorization.length < 16) {
    return res.status(ERR_STATUS_TOKEN).send({ message: 'Token inválido' });
  }

  next();
}

function nameAndAgeValidation(body) {
  const { name, age } = body;
  const Infos = ['name', 'age'];
  const InvalidInfo = [name, age].findIndex((info) => !info);

  if (InvalidInfo !== -1) return { message: `O campo "${Infos[InvalidInfo]}" é obrigatório` }; 

  if (name.length < 3) return { message: 'O "name" deve ter pelo menos 3 caracteres' };

  if (Number(age) < 18) return { message: 'A pessoa palestrante deve ser maior de idade' };

  return false;
}

function talkValidation(body) {
  const { talk } = body;
  const { watchedAt, rate } = talk || {};

  if ([talk, watchedAt, rate].some((info) => info === '' || info === undefined)) {
    return { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  }

  if (!RegExpData.test(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }

  if (![1, 2, 3, 4, 5].some((num) => num === rate)) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }

  return false;
}

function bodyValidation(req, res, next) {
  const NameAndAgeCondition = nameAndAgeValidation(req.body);
  const TalkCondiition = talkValidation(req.body);

  if (NameAndAgeCondition) return res.status(ERR_STATUS).send(NameAndAgeCondition);

  if (TalkCondiition) return res.status(ERR_STATUS).send(TalkCondiition);

  next();
}

function createTalker(req, res) {
  const { name, age, talk } = req.body;
  const TalkerData = JSON.parse(fs.readFileSync('./talker.json'));

  const NewTalker = { name, age, talk, id: TalkerData.length + 1 };
  TalkerData.push(NewTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(TalkerData));
  res.status(SUCCESS_STATUS).send(NewTalker);
}

module.exports = { bodyValidation, tokenValidation, createTalker };