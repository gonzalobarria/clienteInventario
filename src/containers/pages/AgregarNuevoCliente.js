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
import { useDispatch } from 'react-redux';
import {
  formatRut,
  RutFormat,
  validateRut,
  deconstructRut,
} from '@fdograph/rut-utilities';
import { ESTADOS_BOOLEAN } from '../../constants/enums';
import { getSelectValue, jsonToArray, onWheel } from '../../helpers/Utils';
import { FormikReactSelect } from '../form-validations/FormikFields';
import { insCliente, updCliente } from '../../redux/actions';
import IntlMessages from '../../helpers/IntlMessages';

const AgregarNuevoCliente = ({ modalOpen, toggleModal, intl, cliente }) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  const estadosArr = cliente ? jsonToArray(ESTADOS_BOOLEAN) : [];
  const tituloModal = cliente
    ? 'cliente.titulo-edita-cliente'
    : 'cliente.titulo-nuevo-cliente';

  const validationSchema = Yup.object().shape({
    rut: Yup.string().test(
      'validaRut',
      messages['error.rut-incorrecto'],
      (value) => validateRut(value?.toString().toLocaleLowerCase())
    ),
    razonSocial: Yup.string()
      .required(messages['error.razon-social-vacio'])
      .max(256, messages['error.max-largo-descripcion']),
    nombre: Yup.string()
      .required(messages['error.nombre-vacio'])
      .max(100, messages['error.max-largo-descripcion']),
    apPaterno: Yup.string()
      .required(messages['error.paterno-vacio'])
      .max(100, messages['error.max-largo-descripcion']),
    apMaterno: Yup.string()
      .notRequired()
      .max(100, messages['error.max-largo-descripcion']),
    telefono: Yup.string()
      .notRequired()
      .max(25, messages['error.max-largo-descripcion']),
    direccionFacturacion: Yup.string()
      .notRequired()
      .max(200, messages['error.max-largo-descripcion']),
    giro: Yup.string()
      .notRequired()
      .max(200, messages['error.max-largo-descripcion']),
    direccionDespacho: Yup.string()
      .notRequired()
      .max(200, messages['error.max-largo-descripcion']),
    comuna: Yup.string()
      .notRequired()
      .max(200, messages['error.max-largo-descripcion']),
    email: Yup.string()
      .notRequired()
      .email(messages['error.email-invalido'])
      .max(256, messages['error.max-largo-descripcion']),
    activo: Yup.string().when('isEdicion', {
      is: true,
      then: Yup.string().required(messages['error.seleccionar-estado']),
    }),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const { digits, verifier } = deconstructRut(values.rut);

    const payload = {
      ...values,
      rut: digits,
      dv: verifier,
      datosAdicionales: {
        direccionFacturacion: values.direccionFacturacion,
        giro: values.giro,
        direccionDespacho: values.direccionDespacho,
        comuna: values.comuna,
        telefono: values.telefono,
      },
    };

    resetForm({});
    setSubmitting(false);

    if (cliente) {
      payload.idCliente = cliente.id;
      payload.activo = getSelectValue(values.activo);

      dispatch(updCliente(payload));
    } else dispatch(insCliente(payload));

    toggleModal();
  };

  const formattingRut = (e, setFieldValue) => {
    setFieldValue(
      'rut',
      formatRut(
        e.target.value.toString().toLocaleUpperCase(),
        RutFormat.DOTS_DASH
      )
    );
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
        rut: cliente
          ? formatRut(
              (cliente.rut + cliente.dv).toString().toLocaleUpperCase(),
              RutFormat.DOTS_DASH
            )
          : '',
        razonSocial: cliente?.razon_social ?? '',
        nombre: cliente?.nombre ?? '',
        apPaterno: cliente?.ap_paterno ?? '',
        apMaterno: cliente?.ap_materno ?? '',
        email: cliente?.email ?? '',
        telefono: cliente?.datos_adicionales?.telefono ?? '',
        datosAdicionales: {},
        direccionFacturacion:
          cliente?.datos_adicionales?.direccionFacturacion ?? '',
        direccionDespacho: cliente?.datos_adicionales?.direccionDespacho ?? '',
        giro: cliente?.datos_adicionales?.giro ?? '',
        comuna: cliente?.datos_adicionales?.comuna ?? '',
        activo: cliente?.activo ?? '',
        isEdicion: !!cliente,
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
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id={tituloModal} />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.rut" />
                </Label>
                <Field
                  className="form-control"
                  name="rut"
                  autoComplete="off"
                  placeholder={messages['cliente.rut']}
                  onBlur={(value) => formattingRut(value, setFieldValue)}
                />
                {errors.rut && touched.rut ? (
                  <div className="invalid-feedback d-block">{errors.rut}</div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.razon-social" />
                </Label>
                <Field
                  className="form-control"
                  name="razonSocial"
                  autoComplete="off"
                  placeholder={messages['cliente.razon-social']}
                />
                {errors.razonSocial && touched.razonSocial ? (
                  <div className="invalid-feedback d-block">
                    {errors.razonSocial}
                  </div>
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
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.telefono" />
                </Label>
                <Field
                  className="form-control"
                  name="telefono"
                  autoComplete="off"
                  placeholder={messages['cliente.telefono']}
                />
                {errors.telefono && touched.telefono ? (
                  <div className="invalid-feedback d-block">
                    {errors.telefono}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.direccion-facturacion" />
                </Label>
                <Field
                  className="form-control"
                  name="direccionFacturacion"
                  autoComplete="off"
                  placeholder={messages['cliente.direccion-facturacion']}
                />
                {errors.direccionFacturacion && touched.direccionFacturacion ? (
                  <div className="invalid-feedback d-block">
                    {errors.direccionFacturacion}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.direccion-despacho" />
                </Label>
                <Field
                  className="form-control"
                  name="direccionDespacho"
                  autoComplete="off"
                  placeholder={messages['cliente.direccion-despacho']}
                />
                {errors.direccionDespacho && touched.direccionDespacho ? (
                  <div className="invalid-feedback d-block">
                    {errors.direccionDespacho}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.giro" />
                </Label>
                <Field
                  className="form-control"
                  name="giro"
                  autoComplete="off"
                  placeholder={messages['cliente.giro']}
                />
                {errors.giro && touched.giro ? (
                  <div className="invalid-feedback d-block">{errors.giro}</div>
                ) : null}
              </FormGroup>
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
                  <IntlMessages id="cliente.comuna" />
                </Label>
                <Field
                  className="form-control"
                  name="comuna"
                  autoComplete="off"
                  placeholder={messages['cliente.comuna']}
                />
                {errors.comuna && touched.comuna ? (
                  <div className="invalid-feedback d-block">
                    {errors.comuna}
                  </div>
                ) : null}
              </FormGroup>
              {cliente && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.estado" />
                  </Label>
                  <FormikReactSelect
                    name="activo"
                    id="activo"
                    value={estadosArr.find(
                      (option) => option.value === values.activo
                    )}
                    options={estadosArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-estado']}
                  />
                  {errors.activo && touched.activo ? (
                    <div className="invalid-feedback d-block">
                      {errors.activo}
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

export default injectIntl(AgregarNuevoCliente);
