import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthServive from '../../services/auth.service';
import FormContainer from "../FormContainer";
import { useEffect } from 'react';
import { toast } from "react-toastify";

interface IFormInputs {
    username: string;
    password: string;
}

const Login: React.FC = (): JSX.Element => {
    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<IFormInputs>();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Todo App";
        if (AuthServive.isUserLoggedIn()) {
            navigate('/app/home');
        }
    }, []);

    const onSubmit: SubmitHandler<IFormInputs> = (data: object, e: any): void => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/users/login', data)
            .then(res => {
                if (res.status === 200 && res.data.found) {
                    AuthServive.registerSuccessfulLogin(getValues('username'), getValues('password'), res.data.uid);
                    setValue('username', '');
                    setValue('password', '');
                    navigate('/app/home');
                } else {
                    toast.error('Username/Password incorrect', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    }

    return <>
        <FormContainer title="Login">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-person-plus-fill text-white"></i></span>
                        <input type="text" className="form-control" placeholder="Username" {...register("username", { required: true })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.username && "* Username is required"}
                    </small>
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-key-fill text-white"></i></span>
                        <input type="password" className="form-control" placeholder="Password" {...register("password", { required: true })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.password && "* Password is required"}
                    </small>
                    <div className='col text-center'>
                        <button className="btn btn-primary text-center mt-2" type="submit">
                            Log In
                        </button>
                    </div>
                    <p className="text-center mt-5">Don't have an account?<br />
                        <span className="text-primary"><Link to='/register' >Sign Up</Link></span>
                    </p>
                </div>
            </form>
        </FormContainer>
    </>;
}

export default Login;