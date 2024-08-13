import { TAcademicFaculty, TAcademicSemester, TResponseRedux } from "../../../types";
import baseApi from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            providesTags: ["academicSemesters"],
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: { name: string; value: string }) => {
                        params.append(arg.name, arg.value);
                    });
                }

                return {
                    url: "/academic-semesters",
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),
        getSingleAcademicSemester: builder.query({
            providesTags: ["academicSemester"],
            query: (id) => {
                return {
                    url: `/academic-semesters/${id ? id : " "}`,
                    method: "GET",
                };
            },
        }),
        createAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-semester",
                method: "POST",
                body: data,
            }),
        }),
        updateAcademicSemester: builder.mutation({
            invalidatesTags: ["academicSemesters"],
            query: ({ data, id }) => ({
                url: `/academic-semesters/${id ? id : " "}`,
                method: "PATCH",
                body: data,
            }),
        }),
        getAllAcademicFaculties: builder.query({
            providesTags: ["academicFaculties"],
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: { name: string; value: string }) => {
                        params.append(arg.name, arg.value);
                    });
                }

                return {
                    url: "/academic-faculties",
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),
        getSingleAcademicFaculty: builder.query({
            query: (id) => {
                return {
                    url: `/academic-faculties/${id ? id : " "}`,
                    method: "GET",
                };
            },
        }),
        createAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: "/academic-faculties/create-academic-faculty",
                method: "POST",
                body: data,
            }),
        }),
        updateAcademicFaculty: builder.mutation({
            invalidatesTags: ["academicFaculties"],
            query: ({ data, id }) => ({
                url: `/academic-faculties/${id ? id : " "}`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAllSemestersQuery,
    useCreateAcademicSemesterMutation,
    useUpdateAcademicSemesterMutation,
    useGetSingleAcademicSemesterQuery,
    useGetAllAcademicFacultiesQuery,
    useCreateAcademicFacultyMutation,
    useGetSingleAcademicFacultyQuery,
    useUpdateAcademicFacultyMutation
} = academicManagementApi;
