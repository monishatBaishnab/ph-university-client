import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TError } from "../../types";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (
    args,
    api,
    extraOption
): Promise<any> => {
    let result = await baseQuery(args, api, extraOption);
    console.log(result);
    if (result?.error?.status === 404) {
        toast((result.error as TError).data.message);
        return;
    }

    if (result?.error?.status === 401) {
        const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();
        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setUser({ user, token: data.data.accessToken }));
        } else {
            api.dispatch(logOut());
        }
        result = await baseQuery(args, api, extraOption);
    }
    return result;
};

const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ['academicSemesters', 'academicSemester', 'academicFaculties'],
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});

export default baseApi;
