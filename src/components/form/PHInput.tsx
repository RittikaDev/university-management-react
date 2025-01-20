import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
	type: string;
	name: string;
	label?: string;
	disabled?: boolean;
};

const PHInput = ({ type, name, label, disabled }: TInputProps) => {
	return (
		<div style={{ marginBottom: "20px" }}>
			{label ? label : null}
			<Controller
				name={name}
				render={({ field }) => (
					<Input
						{...field}
						type={type}
						id={name}
						size="large"
						disabled={disabled}
					/>
				)} // THE FIELD OBJECT ENSURES THE INPUT COMPONENT IS IN SYNC WITH REACT-HOOK-FORM. AS FIELD INCLUDES:
				// ONCHANGE: A CALLBACK TO UPDATE THE FIELD'S VALUE.
				// ONBLUR: A CALLBACK TO SIGNAL THAT THE FIELD HAS BEEN "TOUCHED."
				// VALUE: THE CURRENT VALUE OF THE FIELD.
				// NAME: THE NAME OF THE FIELD (E.G., "USERID").
			/>
		</div>
	);
};

export default PHInput;
