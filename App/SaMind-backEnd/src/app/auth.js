const jwt = require('jsonwebtoken');
const secret = 'YmFja0VuZC1Mb2dpbi1TYU1pbmQ=' //backEnd-Login-SaMind encode by base64

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, secret);
      req.userId = data.id;
      req.userEmail = data.email;
      req.userPatientId = data.patient_id;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };

module.exports = {authorization, secret};