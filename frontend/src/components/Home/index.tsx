import { NavigateFunction, useNavigate } from "react-router-dom";
import AuthServive from '../../services/auth.service';
import { useEffect } from "react";
import { useAppSelector } from '../../redux/store/store'
import { getTasksByUserId } from '../../redux/slices/taskSlice';
import { AppDispatch, useAppDispatch } from "../../redux/store/store";
import AddTaskForm from "../AddTaskForm";
import TaskItem from "../TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket  } from "@fortawesome/free-solid-svg-icons";
import './styles.css';

const Home: React.FC = (): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch();
    const array: any = useAppSelector((state) => state.task.data);
    const navigate: NavigateFunction = useNavigate();

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        AuthServive.logout();
        navigate('/');
    }

    useEffect(() => {
        document.title = "Todo App - Home";
        dispatch(getTasksByUserId());
    }, [array]);

    return <>
        <button type="button" className="btn btn-primary float-end mt-1 mx-1" onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowRightToBracket} /> Logout
        </button>
        <AddTaskForm />
        {array.map((item: any, i: number) => <TaskItem key={`task_${i}`} item={item}/>)}
        {array && array.length 
        ? <div className="text-center"><strong>{`${array.filter((task: any) => task.completed).length}/${array.length} tasks completed`}</strong></div> 
        : <div className="text-center mx-5 px-5"><strong>You don't have any task yet. Add a new task.</strong></div>}
    </>;
}
export default Home;