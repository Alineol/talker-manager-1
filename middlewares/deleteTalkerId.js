const fs = require('fs');
const { readContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';

const deleteTalkerId = async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(TALKERS_JSON);
  const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
  talkers.splice(talkerIndex, 1);
  fs.writeFileSync('./talker.json', JSON.stringify(talkers));

  res.status(204).end();
};

module.exports = { deleteTalkerId };