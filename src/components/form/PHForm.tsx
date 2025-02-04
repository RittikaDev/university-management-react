import { Form } from "antd";
import { ReactNode } from "react";
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
} from "react-hook-form";

type TFormConfig = {
	defaultValues?: Record<string, unknown>;
	resolver?: any;
};

type TFormProps = {
	onSubmit: SubmitHandler<FieldValues>;
	children: ReactNode;
} & TFormConfig;

const PHForm = ({
	onSubmit,
	children,
	defaultValues,
	resolver,
}: TFormProps) => {
	const formConfig: TFormConfig = {};
	console.log(defaultValues);

	if (defaultValues) formConfig["defaultValues"] = defaultValues;

	if (resolver) formConfig["resolver"] = resolver;

	const methods = useForm(formConfig);

	const submit: SubmitHandler<FieldValues> = (data) => {
		onSubmit(data);
		methods.reset();
	};

	return (
		/*
		 * TO PROVIDE A GENERIC AND REUSABLE FORM COMPONENT.
		 * IT UTILIZES REACT-HOOK-FORM'S FORMPROVIDER TO MAKE FORM METHODS (LIKE VALIDATION AND STATE MANAGEMENT) AVAILABLE TO ALL CHILD COMPONENTS WITHOUT HAVING TO PASS THEM AS PROPS MANUALLY.
		 * ACCEPTS CONFIGURATION AND CHILDREN AS PROPS, MAKING IT HIGHLY FLEXIBLE FOR VARIOUS USE CASES.
		 * {...methods} => FORMPROVIDER ACTS AS A CONTEXT PROVIDER THAT ALLOWS CHILD COMPONENTS TO ACCESS THE FORM METHODS AND STATE WITHOUT HAVING TO PASS THEM EXPLICITLY AS PROPS.
		 *  THIS INCLUDES FUNCTIONS LIKE REGISTER, HANDLESUBMIT, SETVALUE, GETVALUES, AND THE FORM'S STATE, SUCH AS ERRORS AND TOUCHED FIELDS.
		 */
		<FormProvider {...methods}>
			<Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
				{children}
			</Form>
		</FormProvider>
	);
};

export default PHForm;
