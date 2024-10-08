import { TCourses, TResponseRedux, TSemesterRegistration } from "../../../types";
import baseApi from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["semesterRegistrations"],
        }),
        getAllSemesterRegistration: builder.query({
            providesTags: ["semesterRegistrations"],
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: { name: string; value: string }) => {
                        params.append(arg.name, arg.value);
                    });
                }

                return {
                    url: "semester-registrations",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),
        updateSemesterRegistration: builder.mutation({
            query: ({ data, id }) => ({
                url: `/semester-registrations/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["semesterRegistrations"],
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["courses"],
        }),
        getAllCourses: builder.query({
            providesTags: ["courses"],
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: { name: string; value: string }) => {
                        params.append(arg.name, arg.value);
                    });
                }

                return {
                    url: "/courses",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TCourses[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
        }),
    }),
});

export const {
    useCreateSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationMutation,
    useGetAllCoursesQuery,
    useCreateCourseMutation
} = courseManagementApi;
