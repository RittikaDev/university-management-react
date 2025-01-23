import { jwtDecode, JwtPayload } from "jwt-decode";

// INTERFACE AND RETURN TYPE WAS ADDED LATER
interface CustomJwtPayload extends JwtPayload {
	role?: string;
}

export const verifyToken = (token: string): CustomJwtPayload | null => {
	return jwtDecode(token);
};
