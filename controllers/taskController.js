import pool from "../db.js";

export const createTask = async (req, res, next) => {
  try {
    const { description } = req.body;
    const userId = req.user.id;

    const newTask = await pool.query(
      "insert into tasks (description,user_id) values ($1,$2) returning *",
      [description, userId],
    );

    res.json(newTask.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const allTasks = await pool.query(
      "select * from tasks where user_id = $1 order by created_at desc",
      [userId],
    );

    res.json(allTasks.rows);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { description, completed } = req.body;
    const userId = req.user.id;

    const updateTask = await pool.query(
      "update tasks set description = $1 , completed = $2 where id = $3 and user_id = $4 returning *",
      [description, completed, taskId, userId],
    );

    if (updateTask.rows.length === 0) {
      return res
        .status(403)
        .json("This is not your task or it does not exist.");
    }

    res.json("Task was updated!");
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const deleteTask = await pool.query(
      "delete from tasks where id = $1 and user_id = $2 returning *",
      [taskId, userId],
    );

    if (deleteTask.rows.length === 0) {
      return res
        .status(403)
        .json("This is not your task or it does not exist.");
    }

    res.json("Task was deleted");
  } catch (err) {
    next(err);
  }
};

export const toggleTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    const userId = req.user.id;

    const toggleStatus = await pool.query(
      "update tasks set completed = $1 where id = $2 and user_id = $3 returning *",
      [completed, taskId, userId],
    );

    if (toggleStatus.rows.length === 0) {
      return res.status(403).json("Access denied or task missing");
    }
    res.json(toggleStatus.rows[0]);
  } catch (err) {
    next(err);
  }
};
