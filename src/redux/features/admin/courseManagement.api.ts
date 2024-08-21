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
        }),
        getAllSemesterRegistration: builder.query({
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
    }),
});

export const { useCreateSemesterRegistrationMutation, useGetAllSemesterRegistrationQuery } =
    courseManagementApi;
