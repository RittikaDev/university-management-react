import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";

const Login = () => {
	const dispatch = useAppDispatch();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			userId: "A-0002",
			password: "admin123",
		},
	});

	const [login] = useLoginMutation();

	const onSubmit = async (data: { userId: string; password: string }) => {
		const userInfo = {
			id: data.userId,
			password: data.password,
		};

		const res = await login(userInfo).unwrap();
		const user = verifyToken(res.data.accessToken);

		dispatch(setUser({ user: user, token: res.data.accessToken }));
	};

	return (
		// handleSubmit IS A FUNCTION PROVIDED BY REACT-HOOK-FORM. IT WRAPS YOUR onSubmit FUNCTION AND ENSURES THE FORM'S VALIDATION RULES ARE APPLIED BEFORE onSubmit IS EXECUTED.
		// WRITING onSubmit (WITHOUT PARENTHESES) PASSES THE FUNCTION REFERENCE TO handleSubmit
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="id">ID: </label>
				<input type="text" id="id" {...register("userId")} />
			</div>
			<div>
				<label htmlFor="password">Password: </label>
				<input type="text" id="password" {...register("password")} />
			</div>
			<Button htmlType="submit">Login</Button>
		</form>
	);
};

export default Login;
