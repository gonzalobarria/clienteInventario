/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ESTADOS_USUARIO } from '../../constants/enums';
import { FormikReactSelect } from '../form-validations/FormikFields';
import { getSelectValue, jsonToArray } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

const AddNewClient = ({ modalOpen, toggleModal, intl, usuario, accion }) => {
  const { messages } = intl;

  let tituloModal = '';
  let estadosArr = [];

  if (usuario) {
    tituloModal = 'usuario.titulo-edita-usuario';
    estadosArr = jsonToArray(ESTADOS_USUARIO);
  } else {
    tituloModal = 'usuario.titulo-nuevo-usuario';
  }

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required(messages['error.nombre-vacio'])
      .max(100, messages['error.max-largo-descripcion']),
    apPaterno: Yup.string()
      .required(messages['error.paterno-vacio'])
      .max(100, messages['error.max-largo-descripcion']),
    apMaterno: Yup.string()
      .notRequired()
      .max(100, messages['error.max-largo-descripcion']),
    email: Yup.string()
      .email(messages['error.email-invalido'])
      .required(messages['error.email-vacio'])
      .max(256, messages['error.max-largo-descripcion']),
    idEstado: Yup.string().when('isEdicion', {
      is: true,
      then: Yup.string().required(messages['error.seleccionar-estado']),
    }),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    resetForm({});
    setSubmitting(false);

    if (usuario) {
      payload.idUsuario = usuario.id;
      payload.idEstado = getSelectValue(values.idEstado);
      payload.action = 'update';

      accion(payload);
    } else {
      payload.action = 'add';
      delete payload.idEstado;
      delete payload.isEdicion;
      accion(payload);
    }

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        nombre: usuario?.nombre ?? '',
        apPaterno: usuario?.ap_paterno ?? '',
        apMaterno: usuario?.ap_materno ?? '',
        email: usuario?.email ?? '',
        idEstado: usuario?.id_estado ?? '',
        isEdicion: !!usuario,
      }}
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
              <IntlMessages id={tituloModal} />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.email" />
                </Label>
                <Field
                  className="form-control"
                  name="email"
                  autoComplete="off"
                  placeholder={messages['cliente.email']}
                />
                {errors.email && touched.email ? (
                  <div className="invalid-feedback d-block">{errors.email}</div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.nombre" />
                </Label>
                <Field
                  className="form-control"
                  name="nombre"
                  autoComplete="off"
                  placeholder={messages['cliente.nombre']}
                />
                {errors.nombre && touched.nombre ? (
                  <div className="invalid-feedback d-block">
                    {errors.nombre}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.ap-paterno" />
                </Label>
                <Field
                  className="form-control"
                  name="apPaterno"
                  autoComplete="off"
                  placeholder={messages['cliente.ap-paterno']}
                />
                {errors.apPaterno && touched.apPaterno ? (
                  <div className="invalid-feedback d-block">
                    {errors.apPaterno}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.ap-materno" />
                </Label>
                <Field
                  className="form-control"
                  name="apMaterno"
                  autoComplete="off"
                  placeholder={messages['cliente.ap-materno']}
                />
                {errors.apMaterno && touched.apMaterno ? (
                  <div className="invalid-feedback d-block">
                    {errors.apMaterno}
                  </div>
                ) : null}
              </FormGroup>
              {usuario && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.estado" />
                  </Label>
                  <FormikReactSelect
                    name="idEstado"
                    id="idEstado"
                    value={estadosArr.find(
                      (option) => option.value === values.idEstado
                    )}
                    options={estadosArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-estado']}
                  />
                  {errors.idEstado && touched.idEstado ? (
                    <div className="invalid-feedback d-block">
                      {errors.idEstado}
                    </div>
                  ) : null}
                </FormGroup>
              )}
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

export default injectIntl(AddNewClient);
