import { pool } from '../db.js'

export const getTasks = async (req, res) => {
    const [task] = await pool.query('SELECT * FROM tasks WHERE user_id = ?',[req.user.id])
    res.json(task)
}

export const getTask = async (req, res) => {
    const [task] = await pool.query('SELECT * FROM tasks WHERE id = ?',[req.params.id])
    if(task.length <= 0) return res.status(401).json({message: 'User not found'})
    res.json(task[0])
}

export const createTask = async (req, res) => {
    const { title, description  } = req.body
    const [task] = await pool.query('INSERT INTO tasks (title, description, user_id) VALUES (?,?,?)', [title, description, req.user.id])
    res.json({
        id: task.insertId,
        title,
        description
    })
}

export const deleteTask = async (req, res) => {
    const [task] = await pool.query('DELETE FROM tasks WHERE id= ?', [req.params.id])
    if(task.affectedRows <= 0) return res.status(404).json('Task not found')
    res.sendStatus(204)
}

export const uptateTask = async (req, res) => {
    const { title, description } = req.body
    const [task] = await pool.query('UPDATE tasks SET title = IFNULL(?, title), description = IFNULL(?, description) WHERE id = ?',[title, description, req.params.id])
    if(task.affectedRows <= 0) return res.status(404).json({message: 'Task not found'})
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?',[req.params.id])
    res.json(rows[0])
}