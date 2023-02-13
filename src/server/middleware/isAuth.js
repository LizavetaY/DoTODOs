const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authHeader = request.get('Authorization');
  let decodedToken;

  if (!authHeader) {
    request.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    request.isAuth = false;
    return next();
  }

  try {
    decodedToken = jwt.verify(token, 'dotodostokenkey');
  } catch (error) {
    request.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    request.isAuth = false;
    return next();
  }

  request.isAuth = true;
  request.userId = decodedToken.userId;
  next();
};
