

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { InputRenderer } from './InputRenderer';
import { Redirect } from "react-router-dom";
import { CircularProgress, AppBar, Tab, Tabs } from '@material-ui/core';
import { Link } from "react-router-dom"

import { green } from '@material-ui/core/colors';
import { ShowSnack } from '../Helper/Showsnack';
import List from './ListMaker';
import LinearProgress from "components/LinearProgress/LinearProgress"
import FormHeader from 'views/Shared/FormHeader';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    width: "100%",
    [theme.breakpoints.up(1000 + theme.spacing.unit * 3 * 2)]: {
      width: "900px",
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.text.secondary,
    width: theme.spacing.unit * 7,
    height: theme.spacing.unit * 7,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
}
class GenericForm extends React.Component {

  constructor(props,state) {
    console.log(props);

    super(props,state);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: props.tab == undefined ? 0 : props.tab,
      loading: true,
      properties: []
    };
    this.props.model && this.props.model.properties.then(response => {
      this.setState({ properties: response })

    }, () => [])
    // var { from } = this.props.location.state || { from: { pathname: "/" } };
    // console.log("from");
    // console.log(from);

  }

  handleSubmit(event) {
    this.setState({ loading: true })
    var { from } = this.props.location.state || { from: { pathname: "/" } };

    event.preventDefault();
    this.props.model.handleSubmit(event).then(
      (response) => {
        console.log(response);

        ShowSnack.Success(response.message);
        this.setState({ redirect: response.redirect == undefined ? from : response.redirect })
        // this.setState({ value: 1 })
        // return <Redirect to={response.from} />
      },
      error => {
        console.error(error)
        this.setState({ redirect: from })
        ShowSnack.Error(error);
        // return <Redirect to={"/"} />

      })

      .finally(() => {
        this.setState({ loading: false })
      });


  }

  handleChange = (event, value) => {
    this.setState({ value });
  };



  componentWillUpdate() {
    console.log("yes");
  }

  componentDidMount() {
    var cs = this;
    setTimeout(function () {
      cs.setState({ loading: false })
    }
      , 200);


  }
  render() {

    const { classes, formTitle, tab } = this.props;
    const { properties, submitButtonText, Title, Icon , Component } = this.props.model;

    console.log("pro");
    console.log(properties);

    var { redirect, loading } = this.state;
    console.log('redirect: ', redirect);
    const { value } = this.state;
    if (this.state.loading == true) {
      return <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <LinearProgress />
        </main>
      </React.Fragment>
        ;
    }
    return (
      redirect ? <Redirect to={redirect} /> :
        <React.Fragment>
          {/* <CssBaseline /> */}
          {/* <main className={classes.layout}> */}
          <FormHeader title={Title} />

          <AppBar
            component="div"
            className={classes.secondaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Tabs value={value} onChange={this.handleChange} textColor="inherit">

              <Tab textColor="inherit" label="جدید" />
              <Tab textColor="inherit" label="لیست" />
              {/* <Tab textColor="inherit" label="Templates" /> */}
              {/* <Tab textColor="inherit" label="Usage" /> */}
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>

            <Paper elevation={5} className={classes.paper}>

              {
                Icon ? <Avatar className={classes.avatar}>
                  {Icon}
                </Avatar> : Title
              }

              <Typography variant="headline">{formTitle}</Typography>
              {
                Component != undefined ? Component :
                  <form onSubmit={this.handleSubmit} method="post" className={classes.form}>
                    {this.state.properties.map((p) => {
                      return <InputRenderer key={p.Name} classes={classes} {...p} />;
                    })}
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                    >
                      {!loading && submitButtonText == null ? "ثبت" : submitButtonText}
                      {loading && <CircularProgress size={24} />}
                    </Button>

                  </form>
              }




            </Paper>

          </TabContainer>}
          {value === 1 && <TabContainer>

            <List model={this.props.model} childModel={this.props.model.ChildModel} />
          </TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}

          {/* </main> */}
        </React.Fragment>
    );
  }


}

GenericForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenericForm);