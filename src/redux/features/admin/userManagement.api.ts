import { TResponseRedux } from "../../../types";
import { TStudentData } from "../../../types/userManagement.type";
import baseApi from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((arg: { name: string; value: string }) => {
                        params.append(arg.name, arg.value);
                    });
                }

                return {
                    url: "/students",
                    method: "GET",
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudentData[]>) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                };
            },
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
