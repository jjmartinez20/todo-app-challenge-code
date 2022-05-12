import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';
import basicAuth from '../services/basicAuth.service';

const router: Router = Router();
const tasksController: TasksController = new TasksController();

router.use(basicAuth);
router.get('/', tasksController.findAll);
router.get('/:id', tasksController.findById);
router.get('/users/:id', tasksController.findByUserId);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

export default router;