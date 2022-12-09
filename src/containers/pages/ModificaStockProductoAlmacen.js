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
import IntlMessages from '../../helpers/IntlMessages';
import { onWheel } from '../../helpers/Utils';

const ModificaStockProductoAlmacen = ({
  modalOpen,
  toggleModal,
  idProducto,
  idAlmacen,
  stockDisponibleOriginal,
  accion,
  intl,
}) => {
  const { messages } = intl;
  const esBodega = window.location.pathname.indexOf('bodegas') !== -1;

  const validationSchema = Yup.object().shape({
    stockDisponible: Yup.number()
      .required(messages['error.stock-vacio'])
      .min(0, messages['error.minimo-cero'])
      .max(500000, messages['error.max-largo-descripcion']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      action: 'update',
      idProducto,
      idAlmacen,
    };

    resetForm({});
    setSubmitting(false);

    accion(payload, 'update');

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    resetForm({});
    setErrors({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        stockDisponible: stockDisponibleOriginal,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ resetForm, errors, touched, setErrors }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="almacenes.modifica-stock" />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100">
                <Label>
                  {esBodega ? (
                    <IntlMessages id="almacenes.stock-actual-bodega" />
                  ) : (
                    <IntlMessages id="almacenes.stock-actual-local" />
                  )}
                </Label>
                <Field
                  className="form-control"
                  name="stockDisponible"
                  autoComplete="off"
                  type="number"
                  placeholder={messages['almacenes.ingresa-stock']}
                />
                {errors.stockDisponible && touched.stockDisponible ? (
                  <div className="invalid-feedback d-block">
                    {errors.stockDisponible}
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

export default injectIntl(ModificaStockProductoAlmacen);
