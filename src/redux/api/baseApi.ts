import {
	BaseQueryApi,
	BaseQueryFn,
	createApi,
	DefinitionType,
	FetchArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { setUser, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/api/v1",
	credentials: "include", // ENSURES THAT COOKIES ARE SENT ALONG WITH CROSS-ORIGIN REQUESTS (NECESSARY FOR HTTPONLY REFRESH TOKENS), SINCE JAVASCRIPT CAN NOT DIRECTLY ACCESS COOKIES, ALSO THIS NEEDS TO BE ADDED TO BACKEND AS WELL
	// TO ADD authorization TOKEN SENT ON ALL API REQUESTS
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) headers.set("authorization", `${token}`);

		return headers;
	},
});

// THIS IS DONE, TO CALL FOR REFRESH TOKEN, WHEN ACCESS EXPIRES
const baseQueryWithRefreshToken: BaseQueryFn<
	FetchArgs,
	BaseQueryApi,
	DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
	let result = await baseQuery(args, api, extraOptions);

	// NOT FOUND ERROR, JUST SO THAT NOT EVERY ERROR GOES MIXED UP WITH 401 ERROR
	if (result?.error?.status === 404) {
		if (
			result.error.data &&
			typeof result.error.data === "object" &&
			"message" in result.error.data
		)
			toast.error((result.error.data as { message: string }).message);
	}
	// CHECKS FOR UNAUTHORIZATION
	if (result?.error?.status === 401) {
		//* Send Refresh
		console.log("Sending refresh token");

		const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
			method: "POST",
			credentials: "include",
		});

		const data = await res.json();

		if (data?.data?.accessToken) {
			const user = (api.getState() as RootState).auth.user;

			api.dispatch(
				setUser({
					user,
					token: data.data.accessToken,
				})
			);

			// CALLS BACK THE MAIN API THAT WAS ORIGINALLY TRYING TO CALL, BEFORE TOKEN EXPIRE ISSUE HAPPENED
			result = await baseQuery(args, api, extraOptions);
		} else api.dispatch(logout());
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithRefreshToken,
	tagTypes: ["semester", "courses"],
	endpoints: () => ({}),
});
