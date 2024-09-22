import "dotenv/config";
import express from "express";
import cors from "cors";
// import imageRoutes from "./routes/image-routes.js"
import pokemonRoutes from "./routes/pokemon-routes.js"

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());

app.use(express.json());
app.use(express.static('public'));
app.use("/type", pokemonRoutes);
app.get("/", (_req, res) => {
    res.send("Welcome to The Type Podcast API");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});