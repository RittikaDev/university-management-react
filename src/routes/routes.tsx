import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import About from "../pages/About";

import { adminRoutes } from "./admin.routes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />, // WILL RENDER INSIDE APP'S OUTLET TAG
		children: [
			{
				path: "about",
				element: <About />,
			},
		],
	},
	{
		path: "/admin",
		element: <App />, // <AdminLayout /> THIS WILL MAKE THE ROUTING HAPPEN INSIDE AdminLayout COMPONENT'S OUTLET TAG
		children: adminRoutes,
	},
	{
		path: "/faculty",
		element: <App />,
		children: adminRoutes,
	},
	{
		path: "/student",
		element: <App />,
		children: adminRoutes,
	},
]);

export default router;

/*
1. Main Routing Logic (router.tsx)
	The router.tsx file is the primary routing configuration.
	It uses react-router-dom to map paths to components.
	When a route is accessed (e.g., /admin/dashboard), the router determines:
	Which parent component should wrap the route (e.g., MainLayout).
	Which child component should be rendered inside the parent component's <Outlet>.
2. MainLayout and Menu Interaction
	The MainLayout handles the user interface for routes within its scope.
	The menu items in MainLayout provide links to the corresponding routes using <NavLink>. For example:
	tsx
	{
	key: "Dashboard",
	label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
	}
	When a menu item is clicked, the NavLink updates the browser's URL (e.g., /admin/dashboard).
3. The Browser Router (Glue Between URL and Component)
	The updated URL triggers the react-router-dom logic defined in router.tsx.
	The router matches the URL (/admin/dashboard) to the corresponding route in the configuration.
	The router then renders the appropriate component (<AdminDashboard />).
How it Works Together:
	User Action:
		A user clicks a menu item in the sidebar (e.g., "Dashboard").
	Navigation Link:
		The NavLink updates the URL in the browser to /admin/dashboard.
	Router Matching:
		The router in router.tsx identifies the route for /admin/dashboard and decides:
		Render the MainLayout as the parent component (if not already rendered).
		Render the <AdminDashboard /> component inside the <Outlet> in MainLayout.
*/
