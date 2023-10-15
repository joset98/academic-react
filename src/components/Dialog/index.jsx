/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import css from "@styled-system/css";
import { width as systemWidth } from "styled-system";
import { withStyles } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from "@mui/material/Slide";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    zIndex: '11',
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    ${css({
        maxHeight: "90vh",
        maxWidth: "100vh",
        overflowX: "hidden",
        overflowY: "auto",
        borderRadius: "4px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      })
    }
    ${systemWidth}
  }
`;

const Transition = React.forwardRef((prop, ref) => (
  <Slide direction="left" ref={ref} {...prop} />
));

const TemplateDialog = withStyles(styles)((props) => {
  const {
    component,
    onClose,
    open,
    classes,
    width
  } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <StyledDialog
      fullWidth
      {...props}
      open={open}
      keepMounted
      scroll="body"
      systemWidth={width}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      {component}
    </StyledDialog>
  );
});

TemplateDialog.propTypes = {
  component: PropTypes.element,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

TemplateDialog.defaultProps = {
  component: null,
  onClose: () => {},
  open: true,
};

export default TemplateDialog;
