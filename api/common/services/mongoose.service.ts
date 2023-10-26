import debug from "debug";
import mongoose from "mongoose";

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  };

  constructor() {
    log("call mongoose");
    this.connectWithRetry();
  }

  connectWithRetry = () => {
    log("Attempting Mongodb connection ()");
    mongoose
      .connect("mongodb://localhost:27017/api-db", this.mongooseOptions)
      .then(() => {
        log("Mongodb is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(
          `Mongodb connection unsuccessful will retry #${++this
            .count} after ${retrySeconds} seconds`
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  };

  getMongoose() {
    return mongoose;
  }
}

export default new MongooseService();
