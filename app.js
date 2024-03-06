require("dotenv").config(); //require the config files
const express = require("express");
const cors = require("cors");

// db connection
const { connectToDb } = require("./utils/dbcon");
const { userRoutes } = require("./routes/user");
const { undefinedrouter } = require("./routes/undefinedroute");

connectToDb();
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(cors());

app.use((req, res, next) => {
  let payloadSize = req.headers["content-length"];
  console.log(`[Request Payload Size: ${payloadSize}]`);
  console.log(
    `[time: "${new Date().toISOString()}"  method: "${req.method}"   url: "${
      req.originalUrl
    }"  payload: "${JSON.stringify(req.body)}"  user-agent: "${
      req.headers["user-agent"]
    }"  ip: "${req.ip}"]`
  );
  next();
});

app.get("/api/v1", (req, res) => {
  res.json({
    statusCode: 200,
    statusText: "SUCCESS",
    data: {
      msg: `Welcome to  Secured Password Management System ${req.ip}`,
      resource: {},
    },
  });
});

app.use("/api/v1/users", userRoutes);

//catch undefined endpoints
app.use(undefinedrouter);

//spin up the server on the env port number
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});
