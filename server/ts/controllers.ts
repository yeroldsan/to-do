import { Request, Response } from "express";
import { pool } from "./database";
import { QueryResult, QueryResultRow } from "pg";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const result: QueryResult = await pool.query(
      "select * from task order by completed desc"
    );
    const rows: QueryResultRow[] = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const description: string = req.body.description;
    const completed: boolean = false;
    const sql: string =
      "insert into task (description, completed) values ($1, $2) returning *";
    const result: QueryResult = await pool.query(sql, [description, completed]);
    const rows: QueryResultRow = result.rows ? result.rows : [];
    res.status(200).json({ id: rows[0].id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const description: string = req.body.description;
    const completed: boolean = req.body.completed;
    const sql: string =
      "update task set description = $1, completed = $2 where id= $3 returning *";
    const result: QueryResult = await pool.query(sql, [
      description,
      completed,
      id,
    ]);
    const rows: QueryResultRow[] = result.rows[0].id ? result.rows : [];
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const sql: string = "delete from task where id = $1";
    await pool.query(sql, [id]);
    res.status(200).json({ id: id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const statusTask = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const completed = req.body.completed;
    const sql: string =
      "update task set completed = $1 where id= $2 returning *";
    const result: QueryResult = await pool.query(sql, [completed, id]);
    const rows: QueryResultRow[] = result.rows ?? []; // Same code as result.rows[0].id ? result.rows : []
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default { getAllTasks, createTask, updateTask, deleteTask, statusTask };
