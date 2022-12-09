import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormikReactSelect } from '../form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import useUsuariosOrden from '../../hooks/usuarios/use-usuarios-orden';
import { getSelectValue } from '../../helpers/Utils';

const AssignOrderUser = ({ modalOpen, toggleModal, intl, idOrden, accion }) => {
  const { messages } = intl;
  const { usuariosOrden, isLoading } = useUsuariosOrden(modalOpen);

  const validationSchema = Yup.object().shape({
    idUsuario: Yup.string().required(messages['error.combo-usuarios']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idOrden,
      idUsuario: getSelectValue(values.idUsuario),
    };

    resetForm({});
    setSubmitting(false);

    accion(payload);

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  const comboConvert = (item) => ({
    value: item.id,
    label: `${item.nombre} ${item.ap_paterno}`,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{ idUsuario: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        setFieldValue,
        setFieldTouched,
        setErrors,
        resetForm,
        values,
        errors,
        touched,
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right">
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="orden.receptor-orden" />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="orden.seleccionar-usuario" />
                </Label>
                <FormikReactSelect
                  name="idUsuario"
                  id="idUsuario"
                  value={values.idUsuario}
                  options={!isLoading && usuariosOrden?.map(comboConvert)}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  placeholder={messages['orden.seleccionar-usuario']}
                />
                {errors.idUsuario && touched.idUsuario ? (
                  <div className="invalid-feedback d-block">
                    {errors.idUsuario}
                  </div>
                ) : null}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                outline
                onClick={() => cerrarPopup({ setErrors, resetForm })}
              >
                <IntlMessages id="pages.cancel" />
              </Button>
              <Button color="primary" type="submit">
                <IntlMessages id="pages.submit" />
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default injectIntl(AssignOrderUser);
