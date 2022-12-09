import React, { useEffect } from 'react';
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
import { Redirect } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getProductosNegocioLibres } from '../../redux/actions';
import { FormikReactSelect } from '../form-validations/FormikFields';
import IntlMessages from '../../helpers/IntlMessages';
import {
  checkFuncionalidades,
  comboConvert,
  getSelectValue,
  onWheel,
} from '../../helpers/Utils';
import { Funcionalidades } from '../../helpers/authHelper';

const AsignaProductoCliente = ({
  modalOpen,
  toggleModal,
  intl,
  idCliente,
  accion,
}) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  const { productosNegocio, loadingPNL, errorPNL } = useSelector(
    ({ productosApp }) => ({
      productosNegocio: productosApp.productosNegocioLibres,
      loadingPNL: productosApp.loadingPNL,
      errorPNL: productosApp.errorPNL,
    }),
    shallowEqual
  );

  const validationSchema = Yup.object().shape({
    idProducto: Yup.string().required(messages['error.seleccione-producto']),
    precioVenta: Yup.string().required(messages['error.precio-venta-vacio']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idProducto: getSelectValue(values.idProducto),
      action: 'add',
    };

    resetForm({});
    setSubmitting(false);

    accion(payload);

    toggleModal();
  };

  useEffect(() => {
    if (modalOpen) dispatch(getProductosNegocioLibres(idCliente));
  }, [dispatch, idCliente, modalOpen]);

  const cerrarPopup = ({ setErrors, resetForm }) => {
    resetForm({});
    setErrors({});
    toggleModal();
  };

  if (errorPNL) return <Redirect to="/unauthorized" />;

  let productosNegocioArr;

  if (loadingPNL) {
    productosNegocioArr = productosNegocio.map(comboConvert);

    if (checkFuncionalidades([Funcionalidades.Agregar_Producto])) {
      productosNegocioArr = [
        {
          label: `+ ${messages['mantenedores.titulo-agregar-nuevo-producto']}`,
          value: '00',
        },
        ...productosNegocioArr,
      ];
    }
  }

  const handleState = (opt, e) => {
    if (opt === 'idProducto' && e.value === '00') toggleModal(true);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        idProducto: [],
        precioVenta: '',
        idCliente,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        setFieldValue,
        setFieldTouched,
        setErrors,
        values,
        errors,
        touched,
        resetForm,
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id="cliente.asigna-producto" />
            </ModalHeader>
            <ModalBody>
              {loadingPNL && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.seleccionar-producto" />
                  </Label>
                  <FormikReactSelect
                    name="idProducto"
                    id="idProducto"
                    value={values.idProducto}
                    options={productosNegocioArr}
                    onChange={(opt, e) => {
                      handleState(opt, e);
                      setFieldValue('idProducto', e);
                    }}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-producto']}
                  />
                  {errors.idProducto && touched.idProducto ? (
                    <div className="invalid-feedback d-block">
                      {errors.idProducto}
                    </div>
                  ) : null}
                </FormGroup>
              )}
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="cliente.precio-venta" />
                </Label>
                <Field
                  className="form-control"
                  name="precioVenta"
                  autoComplete="off"
                  type="number"
                  placeholder={messages['cliente.precio-venta']}
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

export default injectIntl(AsignaProductoCliente);
