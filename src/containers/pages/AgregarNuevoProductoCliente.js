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
import { onWheel } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

const AgregarNuevoProducto = ({ modalOpen, toggleModal, intl, accion }) => {
  const { messages } = intl;

  const validationSchema = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-producto-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    precioVenta: Yup.number()
      .required(messages['error.precio-venta-vacio'])
      .max(500000, messages['error.max-largo-descripcion']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      action: 'addCreate',
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

  const onKeyDown = (e) =>
    e.key === 'Enter' && e.target.name === 'barcode'
      ? e.preventDefault()
      : null;

  return (
    <Formik
      enableReinitialize
      initialValues={{ glosa: '', precioVenta: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setErrors, errors, resetForm, touched }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form
            className="av-tooltip tooltip-label-right"
            onKeyDown={onKeyDown}
            onWheel={onWheel}
          >
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="mantenedores.titulo-crear-agregar-producto" />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.nombre-producto" />
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
                  <IntlMessages id="productos.precio-venta" />
                </Label>
                <Field
                  className="form-control"
                  name="precioVenta"
                  autoComplete="off"
                  type="number"
                />
                {errors.precioVenta && touched.precioVenta ? (
                  <div className="invalid-feedback d-block">
                    {errors.precioVenta}
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

export default injectIntl(AgregarNuevoProducto);
