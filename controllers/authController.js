import pool from "../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userCheck = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (userCheck.rows.length > 0) {
      return res.status(401).send("User Already Exists.");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "insert into users (name,email,password) values($1,$2,$3) returning *",
      [name, email, hashedPassword],
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("select * from users where email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      res.status(401).send("Invalid Credintials");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      res.status(401).send("Invalid Credintials");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
