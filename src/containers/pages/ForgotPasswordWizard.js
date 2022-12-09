/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import React, { useState, createRef, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import IntlMessages from '../../helpers/IntlMessages';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';
import { checkCode, forgotPassword, resetPassword } from '../../redux/actions';
import { NotificationManager } from '../../components/common/react-notifications';

const ForgotPasswordWizard = ({ intl }) => {
  const { messages } = intl;
  const dispatch = useDispatch();
  const [emailTmp, setEmailTmp] = useState('');
  const forms = [createRef(null), createRef(null), createRef(null)];

  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'email',
      value: '',
    },
    {
      valid: false,
      name: 'codigo',
      value: '',
    },
    {
      valid: false,
      name: 'pass01',
      value: '',
    },
    {
      valid: false,
      name: 'pass02',
      value: '',
    },
  ]);

  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const {
    forgotUserMail,
    checkCodeResponse,
    loadingFP,
    loadingCC,
    loadingRP,
    error,
    newPassword,
  } = useSelector(
    ({ authUser }) => ({
      forgotUserMail: authUser.forgotUserMail,
      checkCodeResponse: authUser.checkCodeResponse,
      newPassword: authUser.newPassword,
      loadingFP: authUser.loadingFP,
      loadingCC: authUser.loadingCC,
      loadingRP: authUser.loadingRP,
      error: authUser.error,
    }),
    shallowEqual
  );

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    form.submitForm().then(() => {
      const newFields = [...fields];

      Object.entries(form.values).forEach(([key, value]) => {
        newFields.forEach((field) => {
          if (field.name === key) {
            field.value = value.value ? value.value : value;

            if (Array.isArray(value)) field.value = '';
          }
        });
        setFields(newFields);
      });
      let sinErrores = false;
      if (formIndex === 0) {
        sinErrores = !form.errors['email'] && form.touched['email'];

        if (sinErrores) {
          setEmailTmp(form.values['email']);
          dispatch(forgotPassword({ email: form.values['email'] }));
        }
      }
      if (formIndex === 1) {
        sinErrores = !form.errors['codigo'] && form.touched['codigo'];
        if (sinErrores) {
          const payload = {
            email: emailTmp,
            codigoRecuperacion: form.values['codigo'],
          };
          dispatch(checkCode(payload));
        }
      }
      if (formIndex === 2) {
        sinErrores =
          !form.errors['pass01'] &&
          form.touched['pass01'] &&
          !form.errors['pass02'] &&
          form.touched['pass02'];

        if (sinErrores) {
          const payload = {
            pass01: form.values['pass01'],
            pass02: form.values['pass02'],
            token: checkCodeResponse.token,
          };
          dispatch(resetPassword(payload));
        }
      }

      if (sinErrores) {
        goToNext();
        step.isDone = true;
        /* if (steps.length - 1 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
        } */
      }
    });
  };

  useEffect(() => {
    if (loadingFP && forgotUserMail.message) {
      NotificationManager.success(
        forgotUserMail.message,
        'Forgot Password Success',
        3000,
        null,
        null,
        ''
      );
    }
    /* if (error || forgotUserMail.error) {
      NotificationManager.warning(
        forgotUserMail.error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    }  */
  }, [error, loadingFP, forgotUserMail.message]);

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const SignupSchema0 = Yup.object().shape({
    email: Yup.string()
      .email(messages['error.email-invalido'])
      .required(messages['error.email-vacio'])
      .max(256, messages['error.max-largo-descripcion']),
  });

  const SignupSchema1 = Yup.object().shape({
    codigo: Yup.string().matches(/^[0-9]{6}$/, 'Deben ser 6 dígitos'),
  });

  const SignupSchema2 = Yup.object().shape({
    pass01: Yup.string().label('Password').min(6),
    // newPasswordAgain: yup.string().label('Password').min(6),
    pass02: Yup.string().oneOf(
      [Yup.ref('pass01'), null],
      'Passwords must match'
    ),
  });

  return (
    <Card>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <TopNavigation
            className="justify-content-center"
            disableNav={false}
            topNavClick={topNavClick}
          />
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[0]}
                  initialValues={{ email: 'yey@dura.com' }}
                  onSubmit={() => {}}
                  validationSchema={SignupSchema0}
                >
                  {({ errors, touched }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup className="error-l-100">
                        <Label>
                          <IntlMessages id="user.email" />
                        </Label>
                        <Field
                          className="form-control"
                          // id="email"
                          name="email"
                          autoComplete="off"
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc={messages['wizard.step-desc-2']}
            >
              {loadingFP && forgotUserMail?.message && (
                <div className="wizard-basic-step">
                  <Formik
                    innerRef={forms[1]}
                    initialValues={{ codigo: '' }}
                    onSubmit={() => {}}
                    validationSchema={SignupSchema1}
                  >
                    {({ errors, touched }) => (
                      <Form className="av-tooltip tooltip-label-bottom">
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="user.codigo" />
                          </Label>
                          <Field
                            className="form-control"
                            id="codigo"
                            name="codigo"
                            autoComplete="off"
                          />
                          {errors.codigo && touched.codigo ? (
                            <div className="invalid-feedback d-block">
                              {errors.codigo}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </Step>
            <Step
              id="step3"
              name={messages['wizard.step-name-3']}
              desc={messages['wizard.step-desc-3']}
            >
              {loadingCC && checkCodeResponse?.token && (
                <div className="wizard-basic-step">
                  <Formik
                    innerRef={forms[2]}
                    initialValues={{
                      pass01: '',
                      pass02: '',
                    }}
                    onSubmit={() => {}}
                    validationSchema={SignupSchema2}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <FormGroup>
                          <Label>
                            <IntlMessages id="forms.password" />
                          </Label>
                          <Field
                            className="form-control"
                            type="password"
                            id="pass01"
                            name="pass01"
                            placeholder={messages['forms.password']}
                          />
                          {errors.pass01 && touched.pass01 ? (
                            <div className="invalid-feedback d-block">
                              {errors.pass01}
                            </div>
                          ) : null}
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            <IntlMessages id="forms.password" />
                          </Label>
                          <Field
                            className="form-control"
                            type="password"
                            id="pass02"
                            name="pass02"
                            placeholder={messages['forms.password']}
                          />
                          {errors.pass02 && touched.pass02 ? (
                            <div className="invalid-feedback d-block">
                              {errors.pass02}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </Step>
            <Step id="step4" hideTopNav>
              {loadingRP && newPassword && (
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.content-thanks" />
                  </h2>
                  <p>
                    <IntlMessages id="wizard.registered" />
                  </p>
                </div>
              )}
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className="justify-content-center"
            prevLabel={messages['wizard.prev']}
            nextLabel={messages['wizard.next']}
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(ForgotPasswordWizard);
