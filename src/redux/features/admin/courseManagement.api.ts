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
    }),
});

export const { useCreateSemesterRegistrationMutation } = courseManagementApi;
