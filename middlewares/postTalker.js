const { readContentFile, writeContentFile } = require('../editApi');

const TALKERS_JSON = './talker.json';

const postTalker = async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readContentFile(TALKERS_JSON);
    const newTalker = { id: talkers.length + 1, name, age, talk };
    
    const newTalkers = await writeContentFile(TALKERS_JSON, newTalker);

    res.status(201).json(newTalkers);
};

module.exports = { postTalker };