import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import basicAuth from '../services/basicAuth.service';

export const usersRouterProtected: Router = Router();
export const usersRouterPublic: Router = Router();
const usersController: UsersController = new UsersController();

usersRouterProtected.use(basicAuth);
usersRouterProtected.get('/', usersController.findAll);
usersRouterProtected.get('/:id', usersController.findById);
usersRouterProtected.put('/:id', usersController.updateUser);
usersRouterProtected.put('/changepassword/:id', usersController.updatePassword);
usersRouterProtected.delete('/:id', usersController.deleteUser);

usersRouterPublic.post('/', usersController.createUser);
usersRouterPublic.post('/login', usersController.Login);