import React, { useEffect, useState } from 'react';
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
import { FormikReactSelect } from '../form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';
import useNoProductosAlmacen from '../../hooks/almacenes/use-no-productos-almacen';

const AgregaProductoAlAlmacen = ({
  modalOpen,
  toggleModal,
  intl,
  idAlmacen,
  accion,
}) => {
  const { messages } = intl;
  const [loadNAP, setLoadNAP] = useState(false);
  const esBodega = window.location.pathname.indexOf('bodegas') !== -1;

  const { noProductosAlmacen, isLoading: isLoadingNPA } = useNoProductosAlmacen(
    idAlmacen,
    loadNAP
  );

  const validationSchema = Yup.object().shape({
    idProducto: Yup.string().required(messages['error.seleccione-producto']),
    stockDisponible: Yup.number()
      .required(messages['error.stock-vacio'])
      .min(0, messages['error.minimo-cero'])
      .max(500000, messages['error.max-largo-descripcion']),
  });

  useEffect(() => {
    if (modalOpen && !loadNAP) setLoadNAP(true);
  }, [modalOpen, loadNAP]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idProducto: getSelectValue(values.idProducto),
      idAlmacen,
    };

    resetForm({});
    setSubmitting(false);

    accion(payload, 'insert');

    toggleModal();
    setLoadNAP(false);
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ idProducto: '', stockDisponible: '' }}
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
              {esBodega ? (
                <IntlMessages id="almacenes.agrega-producto-bodega" />
              ) : (
                <IntlMessages id="almacenes.agrega-producto-local" />
              )}
            </ModalHeader>
            <ModalBody>
              {!isLoadingNPA && (
                <FormGroup className="error-l-100">
                  <Label>
                    <IntlMessages id="almacenes.seleccionar-producto" />
                  </Label>
                  <FormikReactSelect
                    name="idProducto"
                    id="idProducto"
                    value={values.idProducto}
                    options={noProductosAlmacen.map(comboConvert)}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['almacenes.seleccionar-producto']}
                  />
                  {errors.idProducto && touched.idProducto ? (
                    <div className="invalid-feedback d-block">
                      {errors.idProducto}
                    </div>
                  ) : null}
                </FormGroup>
              )}
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

export default injectIntl(AgregaProductoAlAlmacen);
