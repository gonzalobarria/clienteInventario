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
import useAlmacenesActivos from '../../hooks/almacenes/use-almacenes-activos';

const SeleccionaAlmacen = ({
  modalOpen,
  toggleModal,
  intl,
  accion,
  productos,
}) => {
  const { messages } = intl;
  const [loadAA, setLoadAA] = useState(false);

  const { almacenesActivos, isLoading } = useAlmacenesActivos(loadAA);

  useEffect(() => {
    if (modalOpen && !loadAA) setLoadAA(true);
  }, [modalOpen, loadAA]);

  const validationSchema = Yup.object().shape({
    idAlmacen: Yup.string().required(messages['error.seleccione-almacen']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const idAlmacen = getSelectValue(values.idAlmacen);

    const idTipoAlmacen = almacenesActivos.find((item) => item.id === idAlmacen)
      .id_tipo_almacen;

    resetForm({});
    setSubmitting(false);

    toggleModal();
    accion({ idAlmacen, idTipoAlmacen, productos });
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    resetForm({});
    setErrors({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ idAlmacen: '' }}
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
              <IntlMessages id="orden.destino-preorden" />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100">
                <Label>
                  <IntlMessages id="almacenes.seleccionar-bodega-local" />
                </Label>
                {!isLoading && (
                  <FormikReactSelect
                    name="idAlmacen"
                    id="idAlmacen"
                    value={values.idAlmacen}
                    options={almacenesActivos?.map(comboConvert)}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['almacenes.seleccionar-bodega-local']}
                  />
                )}
                {errors.idAlmacen && touched.idAlmacen ? (
                  <div className="invalid-feedback d-block">
                    {errors.idAlmacen}
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

export default injectIntl(SeleccionaAlmacen);
