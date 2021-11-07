const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query("SELECT * FROM records", (err, rows) => {
      if (err) return res.send(err);

      res.json(rows);
    });
  });
});

routes.get("/getLastTenRecords", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM records ORDER BY id DESC LIMIT 10",
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.get("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "SELECT * FROM records WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.json(rows);
      }
    );
  });
});

routes.post("/", (req, res) => {
  const { concept, amount, date, types } = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "INSERT INTO records set concept = ?, amount = ?, date = ?, types = ?",
      [concept, amount, date, types],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Records saved");
      }
    );
  });
});

routes.delete("/:id", (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "DELETE FROM records WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Records excluded!");
      }
    );
  });
});

routes.put("/:id", (req, res) => {
  const { concept, amount, date } = req.body;
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      "UPDATE records set concept = ?, amount = ?, date = ? WHERE id= ?",
      [concept, amount, date, req.params.id],
      (err, rows) => {
        if (err) return res.send(err);

        res.send("Records updated!");
      }
    );
  });
});

module.exports = routes;
