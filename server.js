import express from "express";
import admin from "firebase-admin";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  )
});

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("CR310 SERVER OK");
});

app.post("/data", async (req, res) => {
  try {
    const { lokasi, jenis, nilai, waktu } = req.body;

    await db.collection("dataloggers").add({
      lokasi: lokasi || "UNKNOWN",
      jenis: jenis || "UNKNOWN",
      nilai: Number(nilai) || 0,
      waktu: waktu || new Date().toISOString(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR");
  }
});

app.listen(process.env.PORT || 3000);
