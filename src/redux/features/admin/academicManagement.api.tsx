import { TQueryParam, TResponseRedux } from "../../../types";
import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
} from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				const params = new URLSearchParams(); // TO CREATE AND MANAGE KEY-VALUE PAIRS THAT FORM THE QUERY STRING OF A URL (E.G., ?KEY1=VALUE1&KEY2=VALUE2).

				console.log(params);

				if (args)
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				return {
					url: "/academic-semesters",
					method: "GET",
					params: params,
				};
			},
			// TRANSFORMS THE API RESPONSE INTO A SPECIFIC STRUCTURE.
			transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicSemester: builder.mutation({
			query: (data) => ({
				url: "/academic-semesters/create-academic-semester",
				method: "POST",
				body: data,
			}),
		}),
		getAcademicFaculties: builder.query({
			query: () => {
				return { url: "/academic-faculties", method: "GET" };
			},
			transformResponse: (response: TResponseRedux<TAcademicFaculty>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicFaculty: builder.mutation({
			query: (data) => ({
				url: "/academic-faculties/create-academic-faculty",
				method: "POST",
				body: data,
			}),
		}),
		getAcademicDepartments: builder.query({
			query: () => {
				return { url: "/academic-departments", method: "GET" };
			},
			transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicDepartment: builder.mutation({
			query: (data) => ({
				url: "/academic-departments/create-academic-department",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllSemestersQuery,
	useAddAcademicSemesterMutation,
	useGetAcademicDepartmentsQuery,
	useGetAcademicFacultiesQuery,
} = academicManagementApi;
