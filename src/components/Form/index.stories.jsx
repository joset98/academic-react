import React from 'react';
import Input from './FormInput';
import TextField from './FormTextField';

const stories = {
  component: Input,
  title: 'Components/Form',
}

export const Default = () => <Input placeholder="Ingresa nombre" />;
export const DefaultTextField = () => <TextField id="standard-search" label="Search field" type="search" />
export const TextFieldOutlined = () =>   <TextField id="outlined-basic" label="Outlined" variant="outlined" />
export const TextFieldError = () => <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry."/>;



export default stories;