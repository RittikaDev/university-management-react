import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// MUTATION FOR ACTIONS THAT MODIFY SERVER-SIDE DATA
		login: builder.mutation({
			query: (userInfo) => ({
				url: "/auth/login",
				method: "POST",
				body: userInfo,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi; // A CUSTOM HOOK A CUSTOM HOOK PROVIDED BY RTK QUERY FOR USING THE LOGIN MUTATION. RETURNS A FUNCTION (LOGIN) FOR TRIGGERING THE MUTATION. METADATA SUCH AS ERROR, ISLOADING, ETC.
