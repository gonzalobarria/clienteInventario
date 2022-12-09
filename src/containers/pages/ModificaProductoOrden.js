/* eslint-disable no-nested-ternary */
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
import { ESTADOS_ORDEN } from '../../constants/enums';
import IntlMessages from '../../helpers/IntlMessages';
import useProductosAlmacen from '../../hooks/almacenes/use-productos-almacen';
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';
import useUnidadesMedida from '../../hooks/unidades-medida/use-unidades-medida';
import { FormikReactSelect } from '../form-validations/FormikFields';

const ModificaProductoOrden = ({
  modalOpen,
  toggleModal,
  intl,
  idOrden,
  producto,
  orden,
  accion,
}) => {
  const { messages } = intl;
  const [maxQty, setMaxQty] = useState(0);
  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();
  const { ENVIADO, EN_PROCESO, PREORDEN_GENERADA } = ESTADOS_ORDEN;

  const { productosAlmacen, isLoading: isLoadingPA } = useProductosAlmacen(
    orden.id_origen
  );

  const SignupSchema = Yup.object().shape({
    cantidad: Yup.number()
      .positive(messages['error.mayor-cero'])
      .integer(messages['error.numero-entero'])
      .max(maxQty, `${messages['error.cantidad-maxima']} ${maxQty}`)
      .required(messages['error.cantidad-vacia']),
  });

  const SignupSchemaEnviado = Yup.object().shape({
    cantidad: Yup.number().required(messages['error.cantidad-vacia']),
    cantidadRecibida: Yup.number()
      .positive(messages['error.mayor-cero'])
      .integer(messages['error.numero-entero'])
      .required(messages['error.cantidad-recibida-vacia']),
    observaciones: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
  });

  useEffect(() => {
    if (modalOpen) {
      if (orden?.es_interno) {
        if (!isLoadingPA) {
          const prod = productosAlmacen.find((p) => p.id === producto.id);
          if (prod) setMaxQty(prod.stock_disponible + producto.cantidad);
        }
      } else setMaxQty(process.env.REACT_APP_MAX_PEDIDO);
    }
  }, [
    orden.es_interno,
    modalOpen,
    isLoadingPA,
    producto.id,
    productosAlmacen,
    producto.cantidad,
  ]);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    let payload = {
      ...values,
      idProducto: producto.id,
      datosAdicionales: {
        ...producto.datos_adicionales,
      },
      idOrden,
      idUnidadMedida: getSelectValue(values.idUnidadMedida),
      action: 'update',
    };

    if (orden.id_estado === ENVIADO) {
      payload = {
        ...payload,
        cantidad: producto.cantidad,
        datosAdicionales: {
          ...producto.datos_adicionales,
          observaciones: values.observaciones,
          cantidadRecibida: values.cantidadRecibida,
        },
      };
    }

    resetForm({});
    setSubmitting(false);

    accion(payload, 'update');

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  const unidadesMedidaArr = unidadesMedida?.map(comboConvert);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        cantidad: producto.cantidad,
        idUnidadMedida: producto.idUnidadMedida,
        cantidadRecibida:
          producto.datos_adicionales?.cantidadRecibida ?? producto.cantidad,
        observaciones: producto.datos_adicionales?.observaciones ?? '',
        idEstado: orden.id_estado,
      }}
      validationSchema={
        orden.id_estado === EN_PROCESO
          ? SignupSchema
          : orden.id_estado === ENVIADO
          ? SignupSchemaEnviado
          : ''
      }
      onSubmit={onSubmit}
    >
      {({
        setErrors,
        resetForm,
        errors,
        touched,
        values,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="orden.modificar-producto" />
            </ModalHeader>
            <ModalBody>
              {!isLoadingUM && (
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
              )}
              {[EN_PROCESO, PREORDEN_GENERADA].includes(orden.id_estado) && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="orden.cantidad-producto" /> (Máx: {maxQty}
                    )
                  </Label>
                  <Field
                    className="form-control"
                    name="cantidad"
                    autoComplete="off"
                    type="number"
                    placeholder={messages['orden.cantidad-producto']}
                  />
                  {errors.cantidad && touched.cantidad ? (
                    <div className="invalid-feedback d-block">
                      {errors.cantidad}
                    </div>
                  ) : null}
                </FormGroup>
              )}
              {orden.id_estado === ENVIADO && (
                <>
                  <FormGroup className="error-l-100 has-float-label">
                    <Label>
                      <IntlMessages id="orden.cantidad-solicitada" />
                    </Label>
                    <Field
                      className="form-control"
                      name="cantidad"
                      autoComplete="off"
                      type="number"
                      value={producto.cantidad}
                    />
                    {errors.cantidad && touched.cantidad ? (
                      <div className="invalid-feedback d-block">
                        {errors.cantidad}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-100 has-float-label">
                    <Label>
                      <IntlMessages id="orden.cantidad-recibida" />
                    </Label>
                    <Field
                      className="form-control"
                      name="cantidadRecibida"
                      autoComplete="off"
                      type="number"
                      placeholder={messages['orden.cantidad-recibida']}
                    />
                    {errors.cantidadRecibida && touched.cantidadRecibida ? (
                      <div className="invalid-feedback d-block">
                        {errors.cantidadRecibida}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-100 has-float-label">
                    <Label>
                      <IntlMessages id="orden.observaciones" />
                    </Label>
                    <Field
                      className="form-control"
                      name="observaciones"
                      autoComplete="off"
                      component="textarea"
                      placeholder={messages['orden.observaciones']}
                    />
                    {errors.observaciones && touched.observaciones ? (
                      <div className="invalid-feedback d-block">
                        {errors.observaciones}
                      </div>
                    ) : null}
                  </FormGroup>
                </>
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

export default injectIntl(ModificaProductoOrden);
