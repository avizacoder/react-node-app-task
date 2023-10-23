import { pool } from "../db.js";
import bcryptjs from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const users = async (req, res) => {
  const [users] = await pool.query("SELECT id, username, email FROM users");
  res.json(users);
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  let passwordHash = await bcryptjs.hash(password, 8);
  const [user] = await pool.query(
    "SELECT username FROM users WHERE username = ?",
    [username]
  );
  if (user.length > 0)
    return res.status(400).json(["this username already exists"]);
  const [correo] = await pool.query("SELECT email FROM users WHERE email = ?", [
    email,
  ]);
  if (correo.length > 0)
    return res.status(400).json(["This email already exists"]);
  const [rows] = await pool.query(
    "INSERT INTO users (username, email, password) VALUES(?,?,?)",
    [username, email, passwordHash]
  );
  const token = await createAccessToken({ id: rows.insertId });
  res.cookie("token", token);
  res.json({
    id: rows.insertId,
    username,
    email,
  });
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  if (rows.length == 0) return res.status(400).json(["User not found"]);

  const user = rows[0];

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json(["Incorrect password"]);

  const token = await createAccessToken({ id: user.id });
  res.cookie("token", token, {
    sameSite: 'none',
    secure: true,
    httpOnly: false
  });
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params
  const [user] = await pool.query('DELETE FROM users WHERE id = ?', [id])
  if(user.affectedRows <= 0) return res.status(401).json(["User not found"])
  res.sendStatus(204)
}

export const updateUser = async (req, res) => {
  const { username, email } = req.body

  const [user] = await pool.query('UPDATE users SET username = IFNULL(?, username), email = IFNULL(?,email) WHERE id = ?', [username, email, req.params.id])
  if(user.affectedRows <= 0) return res.status(400).json(["User not found"])
  const [rows] = await pool.query('SELECT username, email FROM users WHERE id = ?', [req.params.id])
  res.json(rows[0])
}

export const profile = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
    req.user.id,
  ]);
  const user = rows[0];
  if (!user.id) res.status(400).json({ message: "User not found" });
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
  });
};

export const verifyToken = (req, res) => {
  const { token } = req.cookies

  if(!token) return res.status(401).json({ message: "Unauthorized" })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({ message: "Unauthorized" })

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [user.id])
    const userFound = rows[0]
    if(!userFound) return res.status(401).json({ message: "Unauthorized" })

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email
    })

  })
}
