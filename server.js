import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CR310 SERVER OK (NO FIREBASE)");
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(process.env.PORT || 3000);
