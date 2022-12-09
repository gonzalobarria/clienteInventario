import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { NotificationManager } from '../../components/common/react-notifications';

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, loading, errorAuth } = useSelector(
    ({ authUser }) => ({
      user: authUser.user,
      loading: authUser.loading,
      errorAuth: authUser.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  useEffect(() => {
    if (errorAuth) {
      NotificationManager.warning(
        errorAuth,
        'Login Error',
        3000,
        null,
        null,
        ''
      );
    }
  }, [errorAuth]);

  const onSubmit = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        const payload = {
          username: values.email,
          password: values.password,
        };
        dispatch(loginUser(payload, history));
      }
    }
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your password';
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters';
    }
    return error;
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side " />
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik
              initialValues={{
                email: 'yey@dura.com',
                password: '123qweasdz',
              }}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Login;
