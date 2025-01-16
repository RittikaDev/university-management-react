import { FieldValues } from "react-hook-form";

import { Button, Row } from "antd";

import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";

import { verifyToken } from "../utils/verifyToken";

import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	// FORM IS NOW BEING MANAGED IN PHForm COMPONENT
	// const { register, handleSubmit } = useForm({
	// 	defaultValues: {
	// 		userId: "A-0002",
	// 		password: "admin123",
	// 	},
	// });

	const defaultValues = {
		userId: "A-0002",
		password: "admin123",
	};

	const [login] = useLoginMutation();
	// EXPLICITLY DEFINING A TYPE (E.G., { USERID: STRING; PASSWORD: STRING }) LIMITS THE REUSABILITY OF THE FUNCTION. BY USING FIELDVALUES, THE FUNCTION CAN HANDLE ANY STRUCTURE OF FORM DATA, MAKING IT MORE GENERIC AND VERSATILE.
	const onSubmit = async (data: FieldValues) => {
		console.log(data);
		const toastId = toast.loading("Logging in");

		try {
			const userInfo = {
				id: data.userId,
				password: data.password,
			};
			const res = await login(userInfo).unwrap();
			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(setUser({ user: user, token: res.data.accessToken }));
			toast.success("Logged in", { id: toastId, duration: 2000 });
			navigate(`/${user.role}/dashboard`);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			toast.error("Something went wrong", { id: toastId, duration: 2000 });
		}
	};

	return (
		// handleSubmit IS A FUNCTION PROVIDED BY REACT-HOOK-FORM. IT WRAPS YOUR onSubmit FUNCTION AND ENSURES THE FORM'S VALIDATION RULES ARE APPLIED BEFORE onSubmit IS EXECUTED.
		// WRITING onSubmit (WITHOUT PARENTHESES) PASSES THE FUNCTION REFERENCE TO handleSubmit
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
				<PHInput type="text" name="userId" label="ID:" />
				<PHInput type="text" name="password" label="Password" />
				<Button htmlType="submit">Login</Button>
			</PHForm>
		</Row>
	);
};

export default Login;
