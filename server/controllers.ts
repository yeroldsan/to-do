import { Request, Response } from "express";
import openDB from "./database";
import { QueryResult } from "pg";

const getAllTasks = (req: Request, res: Response) => {
  let pool = openDB()

  pool.query("select * from task", (error,result) => {
      if (error) {
          res.status(500).json({error: error.message})
      }
      res.status(200).json(result.rows)
  })
}

const createTask = (req: Request, res: Response) => {
  let pool = openDB()

  pool.query("insert into task (description) values ($1) returning *",
  [req.body.description],
  (error: Error, result: QueryResult) => {
      if (error) {
          res.status(500).json({error: error.message})
      }
      res.status(200).json({id: result.rows[0].id})
  })
}

const updateTask = (req: Request, res: Response) => {
  let pool = openDB()

  let id = req.params.id
  let description = req.body.description

  pool.query("update task set description = $1 where id= $2 returning *",
  [description,id],
  (error: Error, result: QueryResult) => {
      if (error) {
          res.status(500).json({error: error.message})
      }

      res.status(200).json({id: result.rows[0].id})
  })
}

const deleteTask = async (req: Request, res: Response) => {
  let pool = openDB()

  let id = parseInt(req.params.id)

  pool.query("delete from task where id = $1",
  [id],
  (error: Error, result: QueryResult) => {
      if (error) {
          res.status(500).json({error: error.message})
      }
      res.status(200).json({id: id})
  })
}

const statusTask = (req: Request, res: Response) => {
  let pool = openDB()

  let id = req.params.id
  let completed = req.body.completed

  pool.query("update task set completed = $1 where id= $2 returning *",
  [completed,id],
  (error: Error, result: QueryResult) => {
      if (error) {
          res.status(500).json({error: error.message})
      }
      res.status(200).json({id: result.rows[0].id})
  })
}

export default { getAllTasks, createTask, updateTask, deleteTask, statusTask }