const express = require("express");
const PORT = 3333;
const app = express();
const cors = require("cors");
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => console.log(`Servidor rodando na PORTA: ${PORT}`));
