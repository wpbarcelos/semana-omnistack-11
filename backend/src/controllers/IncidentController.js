const connection = require("../database/connection");

module.exports = {
  async store(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const dataInsert = {
      title,
      description,
      value,
      ong_id
    };
    console.log(dataInsert);
    const [id] = await connection("incidents").insert(dataInsert);
    return response.json({ id });
  },
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection("incidents").count();
    const ongs = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);
    response.header("X-Total-Count", count["count(*)"]);
    return response.json(ongs);
  },
  async delete(request, response) {
    const id = request.params.id;
    const ong_id = request.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    // if (incident == undefined) {
    //   return response.status(404).send();
    // }
    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }
    await connection("incidents")
      .where("id", id)
      .delete();
    return response.status(204).send();
  }
};
