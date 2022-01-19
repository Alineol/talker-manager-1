const { readContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';

const getTalker = async (_req, res) => {
  const talkers = await readContentFile(TALKERS_JSON);
  res.status(200).json(talkers);
};

module.exports = {
  getTalker,
};