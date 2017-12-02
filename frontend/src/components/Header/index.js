/**
 * Created by satuk on 20.07.17.
 */
import React from "react";
import { createStyleSheet, withStyles } from "material-ui/styles";
import PropTypes from "prop-types";
import { AppBar, Button, IconButton, Toolbar, Typography } from "material-ui";
import { Link } from "react-router-dom";
import Home from "material-ui-icons/Home";

const styleSheet = createStyleSheet("Header", {
  root: {
    width: "100%",
    marginTop: 100
  },
  flex: {
    flex: 1
  },
  toolbar: {
    backgroundColor: "steelblue"
  },
  a: {
    textDecoration: "none"
  }
});

const Header = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.a}>
            <IconButton>
              <Home />
            </IconButton>
          </Link>
          <Typography type="title" color="inherit" className={classes.flex}>
            e-store
          </Typography>
          <Link className={classes.a} to="/checkout">
            <Button color="contrast">Checkout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Header);
