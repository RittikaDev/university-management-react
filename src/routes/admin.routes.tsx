import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TRoute = {
	path: string;
	element: ReactNode;
};

export type TSidebarItem =
	| {
			key: string;
			label: ReactNode;
			children?: TSidebarItem[];
	  }
	| undefined;

export const adminPaths = [
	{
		path: "dashboard", // ROUTE WILL BE /admin/dashboard
		// index: true, // ROUTE WILL BE /admin
		element: <AdminDashboard />,
	},
	{
		path: "create-student",
		element: <CreateStudent />,
	},
	{
		path: "create-admin",
		element: <CreateAdmin />,
	},
	{
		path: "create-faculty",
		element: <CreateFaculty />,
	},
];

// CREATING A SIMILAR STRUCTURE SO THAT CAN THIS FOR BOTH routes AND MainLayout
export const adminPaths2 = [
	{
		name: "Dashboard",
		path: "dashboard",
		element: <AdminDashboard />,
	},
	{
		name: "User Management",
		children: [
			{
				name: "Create Student",
				path: "create-student",
				element: <CreateStudent />,
			},
			{
				name: "Create Admin",
				path: "create-admin",
				element: <CreateAdmin />,
			},
			{
				name: "Create Faculty",
				path: "create-faculty",
				element: <CreateFaculty />,
			},
		],
	},
];

export const adminRoutes = adminPaths2.reduce((acc: TRoute[], item) => {
	if (item.path && item.element) {
		acc.push({
			path: item.path,
			element: item.element,
		});
	}

	if (item.children) {
		item.children.forEach((child) => {
			acc.push({
				path: child.path,
				element: child.element,
			});
		});
	}
	return acc;
}, []);

export const adminSidebarItems = adminPaths2.reduce(
	(acc: TSidebarItem[], item) => {
		if (item.path && item.name) {
			acc.push({
				key: item.name,
				label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
			});
		}

		if (item.children) {
			acc.push({
				key: item.name,
				label: item.name,
				children: item.children.map((child) => ({
					key: child.name,
					label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
				})),
			});
		}

		return acc;
	},
	[]
);

// const newArray = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.name) {
//     acc.push({
//       key: item.name,
//       label: 'NAVLINK',
//     });
//   }

//   if (item.children) {
//     acc.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: 'NAVLINK',
//       })),
//     });
//   }

//   return acc;
// }, []);

// const newArray = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);
