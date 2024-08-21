import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemesters from "../pages/admin/academicManagement/AcademicSemesters";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Courses from "../pages/admin/courseManagement/Courses";
import CreateCourse from "../pages/admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/admin/courseManagement/OfferCourse";
import RegisteredSemester from "../pages/admin/courseManagement/RegisteredSemester";
import SemesterRegistration from "../pages/admin/courseManagement/SemesterRegistration";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import StudentsData from "../pages/admin/userManagement/Students Data";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
            {
                name: "Students",
                path: "student-data",
                element: <StudentsData />,
            },
            {
                path: "student-data/:studentId",
                element: <StudentDetails />,
            },
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
        ],
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A. Semester",
                path: "create-academic-semester",
                element: <CreateAcademicSemester />,
            },
            {
                name: "Academic Semester",
                path: "academic-semester",
                element: <AcademicSemesters />,
            },
            {
                name: "Create A. Faculty",
                path: "create-academic-faculty",
                element: <CreateAcademicFaculty />,
            },
            {
                name: "Academic Faculty",
                path: "academic-faculty",
                element: <AcademicFaculty />,
            },
            {
                name: "Create A. Department",
                path: "create-academic-department",
                element: <CreateAcademicDepartment />,
            },
            {
                name: "Academic Department",
                path: "academic-department",
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: "Courses Management",
        children: [
            {
                name: "Semester Registration",
                path: "semester-registration",
                element: <SemesterRegistration />,
            },
            {
                name: "Registered Semester",
                path: "registered-semester",
                element: <RegisteredSemester />,
            },
            {
                name: "Create Course",
                path: "create-course",
                element: <CreateCourse />,
            },
            {
                name: "Courses",
                path: "courses",
                element: <Courses />,
            },
            {
                name: "Offer Course",
                path: "offer-course",
                element: <OfferCourse />,
            },
            {
                name: "Offered Course",
                path: "offered-course",
                element: <OfferedCourse />,
            },
        ],
    },
];
