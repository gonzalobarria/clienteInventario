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
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import IntlMessages from '../../helpers/IntlMessages';
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';
import { FormikReactSelect } from '../form-validations/FormikFields';
import useProveedoresActivos from '../../hooks/proveedores/use-proveedores-activos';

const SeleccionaProveedor = ({
  modalOpen,
  toggleModal,
  intl,
  accion,
  productos,
}) => {
  const { messages } = intl;
  const [loadAA, setLoadAA] = useState(false);

  const { proveedoresActivos, isLoading } = useProveedoresActivos(loadAA);

  useEffect(() => {
    if (modalOpen && !loadAA) setLoadAA(true);
  }, [modalOpen, loadAA]);

  const validationSchema = Yup.object().shape({
    idProveedor: Yup.string().required(messages['error.seleccione-almacen']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const idProveedor = getSelectValue(values.idProveedor);

    resetForm({});
    setSubmitting(false);

    toggleModal();
    accion({ idProveedor, productos });
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    resetForm({});
    setErrors({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ idProveedor: '' }}
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
          wrapClassName=" disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="orden.proveedor-orden" />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100">
                <Label>
                  <IntlMessages id="mantenedores.seleccionar-proveedor" />
                </Label>
                {!isLoading && (
                  <FormikReactSelect
                    name="idProveedor"
                    id="idProveedor"
                    value={values.idProveedor}
                    options={proveedoresActivos?.map(comboConvert)}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-proveedor']}
                  />
                )}
                {errors.idProveedor && touched.idProveedor ? (
                  <div className="invalid-feedback d-block">
                    {errors.idProveedor}
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

export default injectIntl(SeleccionaProveedor);
