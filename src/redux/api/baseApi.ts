import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/v1",
		credentials: "include", //ENSURES THAT COOKIES ARE SENT ALONG WITH CROSS-ORIGIN REQUESTS (NECESSARY FOR HTTPONLY REFRESH TOKENS), SINCE JAVASCRIPT CAN NOT DIRECTLY ACCESS COOKIES, ALSO THIS NEEDS TO BE ADDED TO BACKEND AS WELL
	}),

	endpoints: () => ({}),
});
