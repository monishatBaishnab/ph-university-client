import baseApi from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: () => ({
                url: "/students",
                method: "GET",
            }),
        }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetAllStudentQuery, useCreateStudentMutation } = userManagementApi;
