const { readContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';
const HTTP_OK_STATUS = 200;

const getTalkerSearch = async (req, res) => {
  const { q } = req.query;
  const talkers = await readContentFile(TALKERS_JSON);
  const filtered = talkers.filter((t) => t.name.includes(q));

  if (!q) {
    return res.status(HTTP_OK_STATUS).json(talkers);
  }

  if (!filtered) {
    return res.status(HTTP_OK_STATUS).json([]);
  }

  res.status(HTTP_OK_STATUS).json(filtered);
};

module.exports = {
  getTalkerSearch,
};