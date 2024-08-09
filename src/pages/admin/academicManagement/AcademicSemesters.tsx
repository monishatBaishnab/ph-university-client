import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemesters = () => {
    const AcademicSemesters = useGetAllSemestersQuery(undefined);
    console.log(AcademicSemesters);

    return (
        <div>
            <h1>This is academic semester page</h1>
        </div>
    );
};

export default AcademicSemesters;