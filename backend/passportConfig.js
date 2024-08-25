const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("./models/User.model");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "thisKeyIsSupposedToBeSecret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT payload:", jwt_payload); // Log the JWT payload

    try {
      // Use jwt_payload.identifier to find the user
      const userId = jwt_payload.identifier; // Correctly extract the identifier field
      console.log("Extracted user ID:", userId); // Log the extracted user ID

      const user = await User.findById(userId);

      if (user) {
        console.log("User found:", user); // Log the user found
        return done(null, user);
      } else {
        console.log("User not found with ID:", userId); // Log when user is not found
        return done(null, false);
      }
    } catch (err) {
      console.log("Error:", err); // Log any errors
      return done(err, false);
    }
  })
);
