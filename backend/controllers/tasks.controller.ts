import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import pool from '../dbconfig/dbconnector';

export default class TasksController {

    public async findAll(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT * FROM todo_project.tasks order by task_id';
            const { rows } = await client.query(sql);
            data = rows;
            client.release();
            success = true;
        } catch (error) {
            message = 'Ocurrió un error al recuperar los datos';
        }
        let response: Object = {success, message, data};
        res.status(success ? 200 : 500).send(response);
    }

    public async findById(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT * FROM todo_project.tasks WHERE task_id = $1';
            const { rows } = await client.query(sql, [id]);
            data = rows;
            client.release();
            success = true;
        } catch (error) {
            message = 'Ocurrió un error al recuperar los datos';
        }
        let response: Object = {success, message, data};
        res.status(success ? 200 : 500).send(response);
    }

    public async findByUserId(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT * FROM todo_project.tasks WHERE user_id = $1 order by task_id';
            const { rows } = await client.query(sql, [id]);
            data = rows;
            client.release();
            success = true;
        } catch (error) {
            message = 'Ocurrió un error al recuperar los datos';
        }
        let response: Object = {success, message, data};
        res.status(success ? 200 : 500).send(response);
    }

    public async createTask(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const { 
                name,
                user_id
            } = req.body;
            const client: PoolClient = await pool.connect();
            const sql = `
            INSERT INTO todo_project.tasks (name, user_id)
            VALUES ($1, $2) RETURNING *
            `;
            const {rows}  = await client.query(sql, [name, user_id]);
            success = rows.length > 0;
            if (success) {
                data = rows[0];
            } else {
                message = 'Ocurrió un error al insertar el registro';
            }
            client.release();
        } catch (error) {
            console.log(error);
            message = 'Ocurrió un error al insertar los datos';
        }
        let response: Object = {success, message, data};
        res.status(success ? 200 : 500).send(response);
    }

    public async updateTask(req: Request, res: Response) {
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const { name } = req.body;
            const completed: boolean = req.body.completed ? false : true;
            const client: PoolClient = await pool.connect();
            const sql = `
            UPDATE todo_project.tasks SET
                name = $1,
                completed = $2
            WHERE task_id = $3
            `;
            const rows  = await client.query(sql, [
                name, 
                completed,
                id      
            ]);
            success = rows.rowCount > 0;
            if (!success) message = 'Ocurrió un error al actualizar el registro';
            client.release();
        } catch (error) {
            console.log(error);
            message = 'Ocurrió un error al actualizar los datos';
        }
        let response: Object = {success, message};
        res.status(success ? 200 : 500).send(response);
    }

    public async deleteTask(req: Request, res: Response) {
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const client: PoolClient = await pool.connect();
            const sql = `DELETE FROM todo_project.tasks WHERE task_id = $1`;
            const rows  = await client.query(sql, [id]);
            success = rows.rowCount > 0;
            if (!success) message = 'Ocurrió un error al eliminar el registro';
            client.release();
        } catch (error) {
            console.log(error);
            message = 'Ocurrió un error al eliminar los datos';
        }
        let response: Object = {success, message};
        res.status(success ? 200 : 500).send(response);
    }

}