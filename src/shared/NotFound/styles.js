import styled from 'styled-components';
import { Paper as TemplatePaper } from '@material-ui/core';
import TemplateText from 'components/Text';
import css from '@styled-system/css';
import { variant } from 'styled-system';

export const Paper = styled(TemplatePaper)`
  ${css({
    padding: ['1em'],
    minHeight: ['400px'],
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center"
  })}
`;

export const Text = styled(TemplateText)`
  ${variant({
    prop: "styles",
    variants: {
      title: {
        fontSize: ['4em']
      },
      subtitle: {
        fontSize: ['1.5em']
      }
    }
  })}
`;

export default {
  Paper,
};
