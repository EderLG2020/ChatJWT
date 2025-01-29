const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { userList } = require("./db");

const JWT_SECRET = "mipassword";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies.jwt,
      ]),
      secretOrKey: JWT_SECRET,
    },
    (payload, done) => {
      const user = userList.find((u) => u.id === payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
