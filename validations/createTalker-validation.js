const isTokenValid = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (token.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  
    next();
  };
  
  const isNameValid = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  
    next();
  };
  
  const isAgeValid = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
  
    next();
  };
  
  const isTalkValid = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt, rate } = talk || {};
    const dataRegex = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
    
    if ([talk, watchedAt, rate].some((info) => info === '' || info === undefined)) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    if (!watchedAt.match(dataRegex)) {
      return res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (![1, 2, 3, 4, 5].some((num) => num === rate)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

module.exports = {
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
};