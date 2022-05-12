
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import AuthServive from '../../services/auth.service';
import axios from "axios";
import { toast } from 'react-toastify';

interface IFormInputs {
    email: string;
    username: string;
    password: string;
    repeated_password: string;
}

const Register: React.FC = (): JSX.Element => {
    const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm<IFormInputs>();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Todo App - Register Form";
        if (AuthServive.isUserLoggedIn()) {
            navigate('/app/home');
        }
    }, []);

    const onSubmit: SubmitHandler<IFormInputs> = (data: object, e: any): void => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/users/', data)
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    setValue('username', '');
                    setValue('email', '');
                    setValue('password', '');
                    setValue('repeated_password', '');
                    toast.success('Successful registration. Redirecting to Login.', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    toast.error(res.data.message, {
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
        
        <FormContainer title='Register'>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="p-4">
                    <div className="input-group mt-3 mb-1">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-envelope text-white"></i></span>
                        <input type="email" className="form-control" placeholder="Email" autoComplete="off" {...register("email", { required: true })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.email && "* Email is required"}
                    </small>
                    <div className="input-group mt-3 mb-1">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-person-plus-fill text-white"></i></span>
                        <input type="text" className="form-control" placeholder="Username" autoComplete="off" {...register("username", { required: true })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.username && "* Username is required"}
                    </small>
                    <div className="input-group mt-3 mb-1">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-key-fill text-white"></i></span>
                        <input type="password" className="form-control" placeholder="Password" {...register("password", { required: true, minLength: 8 })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.password?.type === 'required' && "Password is required"}
                        {errors.password?.type === 'minLength' && "8 characters minimum"}
                    </small>
                    <div className="input-group mt-3 mb-1">
                        <span className="input-group-text bg-primary"><i
                            className="bi bi-key-fill text-white"></i></span>
                        <input type="password" className="form-control" placeholder="Repeat Password" {...register("repeated_password", { required: true, minLength: 8, validate: value => value === getValues('password') })} />
                    </div>
                    <small className="" style={{ color: 'red' }}>
                        {errors.repeated_password?.type === 'required' && "* Repeated Password is required"}
                        {errors.repeated_password?.type === 'minLength' && "8 characters minimum"}
                        {errors.repeated_password?.type === 'validate' && "Password must coincidence in both fields"}
                    </small>
                    <div className='col text-center'>
                        <button className="btn btn-primary text-center mt-2" type="submit">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </FormContainer>
    </>;
}

export default Register;