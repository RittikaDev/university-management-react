import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

// PROTECTEDROUTE RECEIVES A CHILDREN PROP, WHICH ALLOWS IT TO WRAP OTHER COMPONENTS (IN THIS CASE, MAINLAYOUT)
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const token = useAppSelector(useCurrentToken);
	if (!token) return <Navigate to="/login" replace={true} />;

	return children;
};

export default ProtectedRoute;
