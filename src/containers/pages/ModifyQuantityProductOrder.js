/* eslint-disable no-param-reassign */
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
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';
import { FormikReactSelect } from '../form-validations/FormikFields';
import useUnidadesMedida from '../../hooks/unidades-medida/use-unidades-medida';

const ModifyQuantityProductOrder = ({
  modalOpen,
  toggleModal,
  intl,
  setNewCantidad,
  producto,
}) => {
  const { messages } = intl;
  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();

  const getUnidadMedida = (idUnidadMedida) => {
    if (!idUnidadMedida && isLoadingUM) return '';
    return unidadesMedida.find((i) => i.id === parseInt(idUnidadMedida, 10))
      .glosa;
  };

  const validationSchema = Yup.object().shape({
    cantidad: Yup.number()
      .positive(messages['error.mayor-cero'])
      .integer(messages['error.numero-entero'])
      .max(
        producto.stockDisponible,
        `${messages['error.cantidad-maxima']} ${producto.stockDisponible}`
      )
      .required(messages['error.cantidad-vacia']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm({});
    setSubmitting(false);

    const idUnidadMedida = getSelectValue(values.idUnidadMedida);

    setNewCantidad({
      cantidad: values.cantidad,
      idUnidadMedida,
      tipoCompra: getUnidadMedida(idUnidadMedida),
    });

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    resetForm({});
    setErrors({});
    toggleModal();
  };

  const unidadesMedidaArr = unidadesMedida.map(comboConvert);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        cantidad: producto.cantidad,
        idUnidadMedida: producto.idUnidadMedida,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        resetForm,
        errors,
        touched,
        setErrors,
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
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="orden.cantidad-producto" /> (Máx:{' '}
                  {producto.stockDisponible})
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

export default injectIntl(ModifyQuantityProductOrder);
