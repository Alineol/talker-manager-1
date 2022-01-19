const HTTP_OK_STATUS = 200;

const postLogin = (req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
};

module.exports = { postLogin };