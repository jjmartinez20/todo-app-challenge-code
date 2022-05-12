import { Request, Response } from 'express';
import { PoolClient } from 'pg';
import pool from '../dbconfig/dbconnector';

export default class UsersController {

    public async findAll(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT user_id, username, email FROM todo_project.users';
            const { rows } = await client.query(sql);
            data = rows;
            client.release();
            success = true;
        } catch (error) {
            message = 'Error on retrieving data';
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
            const sql = 'SELECT user_id, username, email FROM todo_project.users WHERE user_id = $1';
            const { rows } = await client.query(sql, [id]);
            data = rows;
            client.release();
            success = true;
        } catch (error) {
            message = 'Error on retrieving data';
        }
        let response: Object = {success, message, data};
        res.status(success ? 200 : 500).send(response);
    }

    public async createUser(req: Request, res: Response) {
        let data: any = [];
        let message: string = '';
        let success: boolean = false;
        try {
            const { 
                username, 
                password, 
                email
            } = req.body;
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            const password_hashed = bcrypt.hashSync(password, saltRounds);
            const client: PoolClient = await pool.connect();
            const sql = `INSERT INTO todo_project.users (username, password, email) VALUES ($1, $2, $3) RETURNING *`;
            const {rows}  = await client.query(sql, [username, password_hashed, email]);
            success = rows.length > 0;
            if (success) {
                data = rows[0];
                delete data.password;
            } else {
                message = 'Ocurrió un error al insertar el usuario';
            }
            client.release();
        } catch (error: any) {
            if (error.message.includes('unq_username')) {
                message = "Username already exists";
            } else if (error.message.includes('unq_email')) {
                message = "Email already exists";
            } else {
                message = "Couldn't create the user. Unknown error";
            }
        }
        let response: Object = {success, message, data};
        res.status(200).send(response);
    }

    public async updateUser(req: Request, res: Response) {
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const { 
                username, 
                email
            } = req.body;
            const client: PoolClient = await pool.connect();
            const sql = `
            UPDATE todo_project.users SET
                username = $1,
                email = $2
            WHERE user_id = $3
            `;
            const rows  = await client.query(sql, [username, email, id]);
            success = rows.rowCount > 0;
            if (!success) message = 'Ocurrió un error al actualizar el usuario';
            client.release();
        } catch (error) {
            console.log(error);
            message = 'Ocurrió un error al actualizar los datos';
        }
        let response: Object = {success, message};
        res.status(success ? 200 : 500).send(response);
    }

    public async updatePassword(req: Request, res: Response) {
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const { 
                password
            } = req.body;
            const bcrypt = require('bcrypt');
            const saltRounds = 10;
            let password_hashed: any = '';
            bcrypt.hash(password, saltRounds, function(err: any, hash: any) {
                if (!err) password_hashed = hash;
            });
            const client: PoolClient = await pool.connect();
            const sql = `
            UPDATE todo_project.users SET
                password = $1
            WHERE user_id = $2
            `;
            const rows  = await client.query(sql, [password_hashed, id]);
            success = rows.rowCount > 0;
            if (!success) message = 'Ocurrió un error al actualizar la contraseña';
            client.release();
        } catch (error) {
            console.log(error);
            message = 'Ocurrió un error al actualizar los datos';
        }
        let response: Object = {success, message};
        res.status(success ? 200 : 500).send(response);
    }

    public async deleteUser(req: Request, res: Response) {
        let message: string = '';
        let success: boolean = false;
        try {
            const id: number = parseInt(req.params.id);
            const client: PoolClient = await pool.connect();
            const sql = `DELETE FROM todo_project.users WHERE user_id = $1`;
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

    public async Login(req: Request, res: Response) {
        let data: any[] = [];
        let message: string = '';
        let success: boolean = false;
        let found: boolean = false;
        let uid: number = 0;
        try {
            const { 
                username, 
                password
            } = req.body;
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT * FROM todo_project.users WHERE username = $1';
            const { rows } = await client.query(sql, [username]);
            data = rows;
            if (data.length !== 0) {
                const bcrypt = require('bcrypt');
                let password_hashed: any = data[0].password;
                found = bcrypt.compareSync(password, password_hashed);
                uid = found ? parseInt(data[0].user_id) : 0;
            }
            client.release();
            success = true;
        } catch (error) {
            console.log(error);
            message = 'Error on retrieving data';
        }
        let response: Object = {success, message, found, uid};
        res.status(success ? 200 : 500).send(response);
    }

}