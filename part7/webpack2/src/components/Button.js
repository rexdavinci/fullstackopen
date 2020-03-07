import React from 'react';
import { Button } from 'semantic-ui-react';

const ButtonComp = ({ color, method, name, classStyle, id }) => {
	return (
		<Button
			color={color}
			onClick={method}
			id={id}
			content={name}
			className={classStyle}
		/>
	);
};

export default ButtonComp;
