const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017")
    .then((client) => {
      console.log("MongoDB connected");
      _db = client.db("e-commerce");
      callback();
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No Database Found!");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
