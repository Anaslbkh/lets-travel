let auth = require('../controllers/auth');
const { model } = require('mongoose');
function checkAuth(req, res, next) {
    let token = req.cookies['auth-token'];
    if (token && auth.checkToken(token)) {
        next();
    } else {
        res.status(400);
        res.send('<img style="width: 100%;" src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80">');
    }
}
module.exports = checkAuth;