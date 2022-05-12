import { faCircle, faCircleCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, useAppDispatch } from "../../redux/store/store";
import { deleteTask, updateTask } from "../../redux/slices/taskSlice";

type Props = {
    item: any
};

const TaskItem: React.FC<Props> = ({ item }: Props): JSX.Element => {
    const dispatch: AppDispatch = useAppDispatch();
    const styles: React.CSSProperties = {
        backgroundColor: 'cornsilk',
        margin: '10px auto',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '40%',
        padding: '0 10px',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.12)'
    };

    const update = (item: any) => {
        dispatch(updateTask(item));
    }

    const deleteItem = (item: any) => {
        dispatch(deleteTask(item));
    }

    return (<div style={styles}>
        <div>{item.completed
            ? <FontAwesomeIcon color="green" size='lg' icon={faCircleCheck} onClick={e => update(item)} />
            : <FontAwesomeIcon size='lg' icon={faCircle} onClick={e => update(item)} />} {item.name} </div>
        <button className="btn btn-sm btn-danger" onClick={e => deleteItem(item)}><FontAwesomeIcon icon={faTrashCan} onClick={e => update(item)} /> </button>
    </div>);

}
export default TaskItem;