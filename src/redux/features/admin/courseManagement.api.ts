import { TResponseRedux, TSemesterRegistration } from "../../../types";
import baseApi from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: "semester-registrations/create-semester-registration",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['semesterRegistrations']
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
    }),
});

export const {
    useCreateSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationMutation,
} = courseManagementApi;
