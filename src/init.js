import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config.js";
import "./database/db.js";
import "./models/Video.js";
import "./models/User.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
