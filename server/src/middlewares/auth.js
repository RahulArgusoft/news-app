const {
  fetchTokenFromDB,
  fetchUserFromDB,
  fetchAllUserTokensFromDB,
} = require("../services/user");
const { verifyToken } = require("../utils/jwt-token");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); //getting token grom request headers

    const decoded = verifyToken(token); // verifying token with key

    // verifying if the token is active and present in database. if not means user already logged out and token expired
    // const tokenFromDB = await fetchTokenFromDB(decoded.uid)
    const tokensFromDB = await fetchAllUserTokensFromDB(decoded.uid);

    let isTokenPresent = !!tokensFromDB.filter(
      ({ token: dbToken }) => (token == dbToken)
    ).length;

    if (!isTokenPresent) {
      throw new Error("please authenticate!");
    }

    // this will happen rarely when token is verified and user is not fetched from database
    const user = await fetchUserFromDB(decoded.username);
    if (!user) {
      throw new Error("user not found!");
    }

    delete user.password;

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(401).send({ error1: error.message });
  }
};

module.exports = auth;
