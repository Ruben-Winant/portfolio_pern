const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
process.env.NODE_ENV === "production"
  ? app.use(express.static(path.join(__dirname, "client/build")))
  : null;

const verifyToken = (req, res, next) => {
  let bearertoken = req.headers["authorization"];
  if (typeof bearertoken !== "undefined") {
    bearertoken = bearertoken.split(" ")[1];
    req.token = bearertoken;
    //check if token is expired
    //check on login if token is expired, set state isAuth false
    jwt.decode(bearertoken)["exp"] < jwt.decode(bearertoken)["iat"]
      ? res.sendStatus(403)
      : next();
  } else {
    res.sendStatus(403);
  }
};

//#region CREATE
//add user
app.post("/admin/users/add", verifyToken, async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let roleid = req.body.roleid;
  const saltRounds = 10;

  let userCheck = await pool.query(
    "SELECT username FROM users WHERE username = $1 LIMIT 1",
    [username]
  );

  jwt.verify(req.token, "secretkey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : //check if there already exists an acc with this username
        (res.setHeader("Content-Type", "application/json"),
        userCheck.rows.length > 0
          ? res.send({ message: "user already exists" })
          : (bcrypt.hash(password, saltRounds, function (err, hash) {
              // Store hash in your password DB.
              pool.query(
                "INSERT INTO users (username,password,roleid) VALUES ($1, $2, $3)",
                [username, hash, roleid]
              );
            }),
            res.send({
              message: "user " + username + " created",
              authData,
            })));
  });
});

//add categorie
app.post("/api/skills/categories/add", verifyToken, async (req, res) => {
  let newCat = req.body.newCategorie;

  jwt.verify(req.token, "secretkey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : (pool.query(
          "INSERT INTO skill_categories (name) VALUES ($1) RETURNING *",
          [newCat]
        ),
        res.json({
          message: "categorie " + newCat + " created",
          authData,
        }));
  });
});

//add skill
app.post("/api/skills/add", verifyToken, async (req, res) => {
  let cat_id = req.body.cat_id;
  let name = req.body.name;
  let icon_name = req.body.icon_name;
  let skill_level_id = req.body.skill_level_id;

  jwt.verify(req.token, "secretkey", (err, authData) => {
    err
      ? res.sendStatus(403)
      : (pool.query(
          "INSERT INTO skill (name, icon_name, skill_level_id, cat_id) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, icon_name, skill_level_id, cat_id]
        ),
        res.json({
          message: "skill " + name + " added",
          authData,
        }));
  });
});

//add project to portfolio
app.post("/api/projects/add", verifyToken, async (req, res) => {
  let { name, description, img_url, url } = req.body;

  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      pool
        .query(
          "INSERT INTO portfolio(name, description, img_url, url) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, description, img_url, url]
        )
        .then((result) =>
          res.json({
            data: result.rows[0],
            message: "project " + name + " added to portfolio.",
            authData,
          })
        );
    }
  });
});
//#endregion

//#region READ
//get all personal info
app.get("/api/info", async (req, res) => {
  try {
    const info = await pool.query("SELECT * FROM personal_info WHERE Id=1");
    res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all skill categories
app.get("/api/skills/categories", async (req, res) => {
  try {
    const info = await pool.query(
      "SELECT * FROM skill_categories ORDER BY name"
    );
    res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all skills
app.get("/api/skills", async (req, res) => {
  try {
    const info = await pool.query(
      "SELECT * FROM skill ORDER BY skill_level_id DESC"
    );
    res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all projects
app.get("/api/projects", async (req, res) => {
  try {
    const info = await pool.query("SELECT * FROM portfolio");
    res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all roles
app.get("/api/roles", async (req, res) => {
  try {
    const info = await pool.query("SELECT * FROM role");
    res.json(info.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//#endregion

//#region UPDATE
//update personal info
app.put("/admin/info/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      surname,
      about,
      extra,
      dribble,
      twitter,
      linkedin,
      github,
      role,
    } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (res.json({ message: "updated personal info", authData }),
          pool.query(
            "UPDATE personal_info SET firstname=$1, surname=$2, about=$3, extra=$4, dribble=$5, twitter=$6, linkedin=$7, github=$8, role=$9 WHERE id=$10 RETURNING *",
            [
              firstname,
              surname,
              about,
              extra,
              dribble,
              twitter,
              linkedin,
              github,
              role,
              id,
            ]
          ));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//update categorie
app.put("/api/skills/categories/update", verifyToken, async (req, res) => {
  try {
    const { cat_id, name } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (res.json({ message: "updated categorie", authData }),
          pool.query(
            "UPDATE skill_categories SET name=$1 WHERE cat_id=$2 RETURNING *",
            [name, cat_id]
          ));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//update skill
app.put("/api/skills/update", verifyToken, async (req, res) => {
  try {
    const { cat_id, name, skill_level_id, icon_name, skill_id } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (pool.query(
            "UPDATE skill SET name=$1, cat_id=$3, icon_name=$2, skill_level_id=$4 WHERE skill_id=$5 RETURNING *",
            [name, icon_name, cat_id, skill_level_id, skill_id]
          ),
          res.json({
            message: "updated skill",
            authData,
          }));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//update portfolio
app.put("/api/projects/update", verifyToken, async (req, res) => {
  try {
    const { name, description, img_url, url, pid } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (pool.query(
            "UPDATE portfolio SET name=$1, description=$2, img_url=$3, url=$4 WHERE pid=$5 RETURNING *",
            [name, description, img_url, url, pid]
          ),
          res.json({
            message: "updated portfolio",
            authData,
          }));
    });
  } catch (err) {
    console.error(err.message);
  }
});
//#endregion

//#region DELETE
//delete categorie
app.delete("/api/skills/categories/delete", verifyToken, async (req, res) => {
  try {
    const { cat_id } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (res.json({
            message: "deleted categorie with id " + cat_id,
            authData,
          }),
          pool.query(
            "DELETE FROM skill_categories WHERE cat_id = $1 RETURNING *",
            [cat_id]
          ));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//delete skill
app.delete("/api/skills/delete", verifyToken, async (req, res) => {
  try {
    const { skill_id } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (res.json({
            message: "deleted skill with id " + skill_id,
            authData,
          }),
          pool.query("DELETE FROM skill WHERE skill_id = $1 RETURNING *", [
            skill_id,
          ]));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//delete project
app.delete("/api/projects/delete", verifyToken, async (req, res) => {
  try {
    const { pid } = req.body;

    jwt.verify(req.token, "secretkey", (err, authData) => {
      err
        ? res.sendStatus(403)
        : (res.json({
            message: "deleted project with id " + pid,
            authData,
          }),
          pool.query("DELETE FROM portfolio WHERE pid = $1 RETURNING *", [
            pid,
          ]));
    });
  } catch (err) {
    console.error(err.message);
  }
});

//#endregion

// LOGIN & JWT TOKEN GEN
app.post("/admin/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  //check if user exists
  const founduser = await pool.query(
    "SELECT username FROM users WHERE username = $1",
    [username]
  );

  founduser.rows.length > 0 && founduser.rows[0].username === username // ERROR somethings wrong here
    ? //get hashed password
      (await pool
        .query("SELECT password FROM users WHERE username = $1 LIMIT 1", [
          username,
        ])
        .then((res) => {
          hash = res.rows[0].password;
        }),
      //check if hashed pw is correct
      bcrypt.compare(password, hash, function (err, result) {
        result
          ? //generate and return jwt token which expires in an hour
            jwt.sign(
              {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                username: username,
              },
              "secretkey",
              (err, token) => {
                res.json({ token });
              }
            )
          : res.json({ message: "incorrect password" });
      }))
    : res.json({ message: "username " + username + " doesn't exist" });
});

app.post("/admin/refresh", async (req, res) => {
  let username = req.body.username;
  jwt.verify(req.token, "secretkey", (err, authData) => {
    //check authdata for exp date
    jwt.sign(
      {
        //12 hours valid token
        exp: Math.floor(Date.now() / 1000) + 43200,
        username: username,
      },
      "secretkey",
      (err, token) => {
        res.json({ token });
      }
    );
  });
});

//redirects all invalid paths to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//SERVER
app.listen(PORT, () => {
  console.log("server has started on port " + PORT);
});
