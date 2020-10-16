const mysql = require("mysql");
const express = require("express");

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mysql_deploy_demo",
  });
}

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, resultSet) => {
    if (err) {
      return res.sendStatus(500);
    }
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>MySQL Deploy Demo</title>
        </head>
        <body>
            <h1>MySQL Deploy Demo User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                ${resultSet
                  .map((user) => {
                    return `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.email}</td>
                        </tr>
                    `;
                  })
                  .join("")}
                <tbody>
            </table>
        </body>
        </html>
        `;
    res.send(html);
  });
});

app.listen(port, () => console.log(`app listening on port ${port}`));
