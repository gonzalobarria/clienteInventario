import React from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import ForgotPasswordWizard from '../../containers/pages/ForgotPasswordWizard';

const ForgotPassword = () => {
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="full">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>
            <ForgotPasswordWizard />
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default ForgotPassword;
