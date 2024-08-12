import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { usePHDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;

const MainLayout = () => {
    const dispatch = usePHDispatch();

    const handleLogOut = () => {
        dispatch(logOut());
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0, position: "sticky", top: 0, left: 0, right: 0, zIndex: 50 }}>
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 20px",
                        }}
                    >
                        <div></div>
                        <Button onClick={handleLogOut}>Log out</Button>
                    </div>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
