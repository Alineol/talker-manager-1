const { readContentFile, writeContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';

const putTalkerId = async (req, res) => {
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
};

module.exports = { putTalkerId };