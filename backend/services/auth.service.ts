import { PoolClient } from "pg";
import pool from "../dbconfig/dbconnector";

export default class Auth {

    public async verify(username: string, password: string): Promise<boolean> {
        let data: any[] = [];
        let found: boolean = false;
        try {
            const client: PoolClient = await pool.connect();
            const sql = 'SELECT * FROM todo_project.users WHERE username = $1';
            const { rows } = await client.query(sql, [username]);
            data = rows;
            if (data.length !== 0) {
                const bcrypt = require('bcrypt');
                let password_hashed: any = data[0].password;
                found = bcrypt.compareSync(password, password_hashed);
            }
            client.release();
        } catch (error) {
            console.log(error);
            found = false;
        }
        return found;
    }

}