import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLogOutMutation } from "../redux/features/auth/authApi";
import { usePHDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: "A-0001",
            password: "admin123",
        },
    });
    const navigate = useNavigate();
    const dispatch = usePHDispatch();
    const [login] = useLogOutMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging user...");
        try {
            const userInfo = {
                id: data.id,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;

            dispatch(setUser({ user, token: res.data.accessToken }));
            navigate("/");
            toast.success("Login success.", { id: toastId, duration: 2000 });
        } catch (error) {
            console.log(error);
            toast.error("Something want wrong.", { id: toastId, duration: 2000 });
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "280px" }}>
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="id">ID: </label>
                <input {...register("id")} placeholder="ID" id="id" />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="password">Password: </label>
                <input {...register("password")} placeholder="Password" id="password" />
            </div>
            <Button htmlType="submit" type="primary">
                Log in
            </Button>
        </form>
    );
};

export default Login;
