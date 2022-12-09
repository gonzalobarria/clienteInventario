/* eslint-disable no-unused-vars */
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
import { getSelectValue, onWheel } from '../../helpers/Utils';
import useNoProductosOrden from '../../hooks/ordenes/use-no-productos-orden';
import useUnidadesMedida from '../../hooks/unidades-medida/use-unidades-medida';

const AgregaNuevoProductoALaOrden = ({
  modalOpen,
  toggleModal,
  intl,
  idOrden,
  accion,
}) => {
  const { messages } = intl;
  const [maxQty, setMaxQty] = useState(0);
  const [loadPNO, setLoadPNO] = useState(false);
  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();

  const { noProductosOrden, isLoading: isLoadingNPO } = useNoProductosOrden(
    idOrden,
    loadPNO
  );

  const validationSchema = Yup.object().shape({
    idProducto: Yup.string().required(messages['error.seleccione-producto']),
    cantidad: Yup.number()
      .required(messages['error.cantidad-vacia'])
      .max(maxQty, `${messages['error.cantidad-maxima']} ${maxQty}`),
  });

  useEffect(() => {
    if (modalOpen && !loadPNO) {
      setLoadPNO(true);
    }
  }, [loadPNO, modalOpen]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idProducto: getSelectValue(values.idProducto),
      idUnidadMedida: getSelectValue(values.idUnidadMedida),
      idOrden,
    };

    resetForm({});
    setSubmitting(false);

    accion(payload, 'insert');

    toggleModal();
    setLoadPNO(false);
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  const comboConvert = (item) => ({
    value: item.id,
    label: item.glosa,
    stock: item.stock_disponible,
  });

  const settingMaxQty = (prod, e, setFieldTouched) => {
    setFieldTouched(e);
    if (prod.stock !== undefined) setMaxQty(prod.stock);
    else if (prod.value !== undefined)
      setMaxQty(process.env.REACT_APP_MAX_PEDIDO);
  };

  const unidadesMedidaArr = unidadesMedida.map(comboConvert);

  return (
    <Formik
      enableReinitialize
      initialValues={{ idProducto: '', cantidad: '' }}
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
              <IntlMessages id="orden.agregar-producto-orden" />
            </ModalHeader>
            <ModalBody>
              {!isLoadingNPO && (
                <FormGroup className="error-l-100">
                  <Label>
                    <IntlMessages id="orden.seleccionar-producto" />
                  </Label>
                  <FormikReactSelect
                    name="idProducto"
                    id="idProducto"
                    value={values.idProducto}
                    options={noProductosOrden.map(comboConvert)}
                    onChange={setFieldValue}
                    onBlur={(e) =>
                      settingMaxQty(values.idProducto, e, setFieldTouched)
                    }
                    placeholder={messages['orden.seleccionar-producto']}
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
                  <IntlMessages id="mantenedores.unidad-medida" />
                </Label>
                <FormikReactSelect
                  name="idUnidadMedida"
                  id="idUnidadMedida"
                  value={unidadesMedidaArr.find(
                    (option) => option.value === values.idUnidadMedida
                  )}
                  options={unidadesMedidaArr}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  placeholder={messages['orden.seleccionar-unidad-medida']}
                />
                {errors.idUnidadMedida && touched.idUnidadMedida ? (
                  <div className="invalid-feedback d-block">
                    {errors.idUnidadMedida}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>
                  <IntlMessages id="orden.cantidad-producto" /> (Máx: {maxQty})
                </Label>
                <Field
                  className="form-control"
                  name="cantidad"
                  autoComplete="off"
                  type="number"
                />
                {errors.cantidad && touched.cantidad ? (
                  <div className="invalid-feedback d-block">
                    {errors.cantidad}
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

export default injectIntl(AgregaNuevoProductoALaOrden);
