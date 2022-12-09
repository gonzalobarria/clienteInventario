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
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FormikCustomRadioGroup } from '../form-validations/FormikFields';
import { numberFormat, priceFormat } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import { TIPOS_VENTA } from '../../constants/enums';

const SeleccionaPrecio = ({
  modalOpen,
  toggleModal,
  intl,
  producto,
  changeTipoVenta,
}) => {
  const { messages } = intl;

  const tituloModal = 'usuario.titulo-edita-usuario';

  const validationSchema = Yup.object().shape({
    idTipoVenta: Yup.string().required(messages['error.tipo-descuento-obl']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm({});
    setSubmitting(false);

    changeTipoVenta(producto, values.idTipoVenta);

    toggleModal();
  };

  const tiposVenta = [
    {
      value: TIPOS_VENTA.DETALLE,
      label: `Por Detalle: ${priceFormat(
        producto.precioDetalle
      )} (${numberFormat(producto.unidadesVenta)} uds./paquete) `,
    },
    {
      value: TIPOS_VENTA.EMBALAJE,
      label: `Por Embalaje: ${priceFormat(
        producto.precioEmbalaje
      )} (${numberFormat(producto.unidadesEmbalaje)} uds./embalaje)`,
      disabled:
        producto.stock_disponible <
        Math.floor(producto.unidadesEmbalaje / producto.unidadesVenta),
    },
  ];

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ idTipoVenta: producto?.idTipoVenta }}
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
              <FormGroup className="error-l-100">
                <Label>
                  <IntlMessages id="pos.seleccione-tipo-venta" />
                </Label>
                <FormikCustomRadioGroup
                  name="idTipoVenta"
                  id="idTipoVenta"
                  value={values.idTipoVenta}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={tiposVenta}
                />
                {errors.idTipoVenta && touched.idTipoVenta ? (
                  <div className="invalid-feedback d-block">
                    {errors.idTipoVenta}
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

export default injectIntl(SeleccionaPrecio);
