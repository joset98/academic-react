import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton, Tooltip } from "@mui/material";

import { SET_NAVEGATION } from "providers/NavegationLevel/actions";
import { NavegationLevelContext, NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import Text from "components/Text";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Title,
  ContainerBreadcrumb,
} from "./styles";

const NavigationSection = (propsNav) => (Component) => (props) => {
  const dispatchNavegation = useContext(NavegationLevelDispatchContext);
  const { title: titleProvider, pages: pagesProvider } = useContext(NavegationLevelContext);

  useEffect(() => {
    dispatchNavegation({
      type: SET_NAVEGATION,
      payload: {
        ...propsNav,
      },
    })
  }, []);

  return (
    <>
      {typeof document !== 'undefined' && (
        <>
          <Container>
            <ContainerBreadcrumb>
              <Grid container justify="space-between">
                <Title>{titleProvider}</Title>
                {pagesProvider && pagesProvider.length > 1 && (
                  <Link
                    to={pagesProvider[pagesProvider.length - 2].path}
                  >
                    <Tooltip title="Ir Atrás" aria-label="back">
                      <IconButton
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="success"
                        color="secondary"
                      >
                        <ArrowBackIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Link>
                )}
              </Grid>

              <Breadcrumb>
                {pagesProvider && pagesProvider.map((page, idx) => (
                  <BreadcrumbItem>
                    {idx ? (
                      <span>
                        /
                      </span>
                    ) : ''}
                    {page.path ? (
                      <>
                        <Link to={page.path}>
                          {page.title}
                        </Link>
                      </>
                    ) : (
                      <Text>{page.title}</Text>
                    )}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </ContainerBreadcrumb>
          </Container>
          <Component {...props} />
        </>
      )}
    </>
  )
};

export default NavigationSection;
