import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AppDispatch, useAppDispatch } from "../../redux/store/store";
import { createTask } from "../../redux/slices/taskSlice";

const AddTaskForm: React.FC = (): JSX.Element => {
    const [value, setValue] = useState('');
    const dispatch: AppDispatch = useAppDispatch();

    const addTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(createTask(value));
        setValue('');
    }

    return (<div className='pt-5 mb-3'>
        <form className="row row-cols-md-auto g-1 align-items-center justify-content-center px-3">
            <div className="col-11">
                <div className="input-group">
                    <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="New task" value={value} onChange={e => setValue(e.target.value)} />
                </div>
            </div>
            <div className="col-1 text-center">
                <button className="btn btn-primary" onClick={e => addTask(e)}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </form>
    </div>);
}

export default AddTaskForm;