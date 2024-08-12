import { Button, Col, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLogInMutation } from "../redux/features/auth/authApi";
import { usePHDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import verifyToken from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import PHEye from "../assets/icons/PHEye";
import { useState } from "react";
import PHEyeOff from "../assets/icons/PHEyeOff";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = usePHDispatch();
    const [login] = useLogInMutation();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const defaultUser = {
        userId: "A-0001",
        password: "admin123",
    };

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Logging user...");
        try {
            const userInfo = {
                id: data.userId,
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
        <Row
            justify="center"
            align="middle"
            style={{
                minHeight: "100vh",
            }}
        >
            <Col span={6}>
                <PHForm defaultValues={defaultUser} onSubmit={onSubmit}>
                    <PHInput
                        name="userId"
                        type="text"
                        label="User Id"
                        placeholder="Enter your user id ..."
                    />
                    <PHInput
                        label="Password"
                        name="password"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Enter your password ..."
                        suffix={
                            <button
                                type="button"
                                style={{
                                    border: "0px",
                                    background: "#FFF",
                                    marginBottom: "-4px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setIsShowPassword((prev) => !prev)}
                            >
                                {isShowPassword ? (
                                    <PHEyeOff svgProps={{ height: "16px", width: "16x" }} />
                                ) : (
                                    <PHEye svgProps={{ height: "16px", width: "16x" }} />
                                )}
                            </button>
                        }
                    />
                    <Button htmlType="submit" type="primary">
                        Log in
                    </Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default Login;
