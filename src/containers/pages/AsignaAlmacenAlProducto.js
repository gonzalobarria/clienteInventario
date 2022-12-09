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
import { FormikReactSelect } from '../form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import useNoAlmacenesProducto from '../../hooks/productos/use-no-almacenes-producto';
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';

const AsignaAlmacenAlProducto = ({
  modalOpen,
  toggleModal,
  intl,
  idProducto,
  accion,
}) => {
  const { messages } = intl;

  const {
    noAlmacenesProducto,
    isLoading: isLoadingNAP,
  } = useNoAlmacenesProducto(modalOpen && idProducto);

  const validationSchema = Yup.object().shape({
    idAlmacen: Yup.string().required(messages['error.seleccione-almacen']),
    stockDisponible: Yup.number()
      .required(messages['error.stock-vacio'])
      .min(0, messages['error.minimo-cero'])
      .max(500000, messages['error.max-largo-descripcion']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idAlmacen: getSelectValue(values.idAlmacen),
      idProducto,
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

  return (
    <Formik
      enableReinitialize
      initialValues={{ idAlmacen: '', stockDisponible: '' }}
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
              <IntlMessages id="almacenes.agrega-producto-bodega-local" />
            </ModalHeader>
            <ModalBody>
              {!isLoadingNAP && (
                <FormGroup className="error-l-100">
                  <Label>
                    <IntlMessages id="almacenes.seleccionar-bodega-local" />
                  </Label>
                  <FormikReactSelect
                    name="idAlmacen"
                    id="idAlmacen"
                    value={values.idAlmacen}
                    options={noAlmacenesProducto.map(comboConvert)}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['almacenes.seleccionar-bodega-local']}
                  />
                  {errors.idAlmacen && touched.idAlmacen ? (
                    <div className="invalid-feedback d-block">
                      {errors.idAlmacen}
                    </div>
                  ) : null}
                </FormGroup>
              )}
              <FormGroup className="error-l-100">
                <Label>
                  <IntlMessages id="almacenes.stock-actual" />
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

export default injectIntl(AsignaAlmacenAlProducto);
