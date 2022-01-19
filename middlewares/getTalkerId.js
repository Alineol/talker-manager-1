const { readContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';

const getTalkerId = async (req, res) => {
  const talkers = await readContentFile(TALKERS_JSON);
  const { id } = req.params;
  const talker = talkers.find((i) => i.id === parseInt(id, 10));
  
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

res.status(200).json(talker);
};

module.exports = {
  getTalkerId,
};