const express = require('express');
const bodyparser = require('body-parser');
const con = require('./con');
const Sequelize = require('sequelize');
const app = express();
const port = 3002;

app.use(express.json());


// support parsing of application/json type post data
app.use(bodyparser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyparser.urlencoded({ extended: true }));

// app.use(JSON.parse());

// app.get('/api', (req, res) => {
// 	res.send('Hello!');
// })

app.listen(port, () => {
	console.log(`Example app listening on host and port ${port}`);
})

const sequelize = new Sequelize('Demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


// const User = sequelize.define("users", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   }
//   // hashedPassword: {
//   //   type: DataTypes.STRING(64),
//   //   validate: {
//   //     is: /^[0-9a-f]{64}$/i
//   //   }
//   // }
// });

app.post("/register", async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    return res.send(user);
  } catch (err) {
    return res.send(err);
  }
});

