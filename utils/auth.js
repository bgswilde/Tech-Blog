// helper checking the login credentials and handling when a user tries to do something requiring logged in status without actually logging in
// helper provided by Trilogy Education in the week 14 Module
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
module.exports = withAuth;