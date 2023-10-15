import React from 'react';
import { select } from '@storybook/addon-knobs';
import Button from './index';

const stories = {
  component: Button,
  title: 'Components/Button',
}

export const Default = () => <Button variant={select('variant', ['primary','secondary','warning','danger','light','link',])} >Hello World!</Button>;
export const Disabled = () => <Button disabled>Hello World!</Button>;

export default stories;