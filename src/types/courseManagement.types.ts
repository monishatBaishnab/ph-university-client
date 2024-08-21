import { TAcademicSemester } from "./academicManagement.types";

export interface TSemesterRegistration {
    _id: string;
    academicSemester: TAcademicSemester;
    status: string;
    startDate: string;
    endDate: string;
    minCredit: number;
    maxCredit: number;
}
export interface PreRequisiteCourse {
    course: string;
    isDeleted: boolean;
}

export interface TCourses {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: PreRequisiteCourse[];
    isDeleted: boolean;
    _id: string;
    __v: number;
}
