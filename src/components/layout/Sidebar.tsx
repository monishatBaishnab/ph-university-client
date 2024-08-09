import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { usePHSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;
const userRoles = {
    STUDENT: "student",
    FACULTY: "faculty",
    ADMIN: "admin",
};

const Sidebar = () => {
    const user = usePHSelector(selectCurrentUser);
    let sidebarItems;

    switch (user!.role) {
        case userRoles.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRoles.ADMIN);
            break;
        case userRoles.FACULTY:
            sidebarItems = sidebarItemsGenerator(facultyPaths, userRoles.FACULTY);
            break;
        case userRoles.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths, userRoles.STUDENT);
            break;
        default:
            break;
    }

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div
                className="demo-logo-vertical"
                style={{
                    fontSize: "18px",
                    color: "white",
                    padding: "8px 24px",
                    fontWeight: "bold",
                }}
            >
                PH University
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={sidebarItems} />
        </Sider>
    );
};

export default Sidebar;
