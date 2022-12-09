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
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ESTADOS_ALMACEN } from '../../constants/enums';
import {
  getSelectLabel,
  getSelectValue,
  jsonToArray,
  onWheel,
} from '../../helpers/Utils';
import { FormikReactSelect } from '../form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';

const AgregarNuevoAlmacen = ({
  modalOpen,
  toggleModal,
  intl,
  idTipoAlmacen,
  almacen,
  accion,
}) => {
  const { messages } = intl;
  const esBodega = window.location.pathname.indexOf('bodegas') !== -1;

  let tituloModal = '';
  const estadosArr = jsonToArray(ESTADOS_ALMACEN);

  if (almacen) {
    tituloModal = esBodega
      ? 'mantenedores.titulo-editar-bodega'
      : 'mantenedores.titulo-editar-local';
  } else {
    tituloModal = esBodega
      ? 'mantenedores.titulo-agregar-nueva-bodega'
      : 'mantenedores.titulo-agregar-nuevo-local';
  }

  const validationSchema = Yup.object().shape({
    glosa: Yup.string()
      .max(150, messages['error.max-largo-descripcion'])
      .when('esBodega', {
        is: true,
        then: Yup.string().required(messages['error.nombre-bodega-vacia']),
        otherwise: Yup.string().required(messages['error.nombre-local-vacio']),
      }),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
    direccion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
    idEstado: Yup.string().when('isEdicion', {
      is: true,
      then: Yup.string().required(messages['error.seleccionar-estado']),
    }),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idTipoAlmacen,
      action: almacen ? 'update' : 'add',
    };

    resetForm({});
    setSubmitting(false);

    if (almacen) {
      payload.idAlmacen = almacen.id;
      payload.idEstado = getSelectValue(values.idEstado);
      payload.glosaEstado = values.idEstado.label
        ? getSelectLabel(values.idEstado)
        : almacen.glosa_estado;
    }

    accion(payload);

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
        glosa: almacen?.glosa ?? '',
        descripcion: almacen?.descripcion ?? '',
        idEstado: almacen?.id_estado ?? '',
        direccion: almacen?.datos_adicionales?.direccion ?? '',
        isEdicion: !!almacen,
        esBodega,
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
                  {esBodega ? (
                    <IntlMessages id="mantenedores.nombre-bodega" />
                  ) : (
                    <IntlMessages id="mantenedores.nombre-local" />
                  )}
                </Label>
                <Field
                  className="form-control"
                  name="glosa"
                  autoComplete="off"
                />
                {errors.glosa && touched.glosa ? (
                  <div className="invalid-feedback d-block">{errors.glosa}</div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.description" />
                </Label>
                <Field
                  className="form-control"
                  name="descripcion"
                  component="textarea"
                />
                {errors.descripcion && touched.descripcion ? (
                  <div className="invalid-feedback d-block">
                    {errors.descripcion}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.direccion-almacen" />
                </Label>
                <Field
                  className="form-control"
                  name="direccion"
                  autoComplete="off"
                />
                {errors.direccion && touched.direccion ? (
                  <div className="invalid-feedback d-block">
                    {errors.direccion}
                  </div>
                ) : null}
              </FormGroup>
              {almacen && (
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

export default injectIntl(AgregarNuevoAlmacen);
