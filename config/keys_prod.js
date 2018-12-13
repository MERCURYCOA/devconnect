module.exports = {
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb://mernusers:Aa1234@ds151383.mlab.com:51383/pprpapp",
  secretOrKey: process.env.SECRET_OR_KEY || "secret"
};
