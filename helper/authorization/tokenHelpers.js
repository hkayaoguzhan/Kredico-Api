const sendJwtToClient = (user, res) => {
  const token = user.generateJwtFromUser();

  const { JWT_COOKIE, NODE_ENV } = process.env;
  return res
    .status(200)
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email
      }
    });
};

const isTokenIncluded = req => {
  return req.query.token ;
};
const getAccessTokenFromHeader = req => {
  const authorization = req.query.token;
  return authorization;
};

module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader
};
