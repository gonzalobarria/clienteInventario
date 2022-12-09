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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getProveedor, insProveedor, updProveedor } from '../../redux/actions';
import { ESTADOS_PROVEEDOR } from '../../constants/enums';
import { FormikReactSelect } from '../form-validations/FormikFields';
import { getSelectValue, jsonToArray, onWheel } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

const AddNewProvider = ({
  modalOpen,
  toggleModal,
  intl,
  idProveedor,
  setIdProveedor,
}) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  let tituloModal = '';
  let estadosArr = [];

  if (idProveedor) {
    tituloModal = 'mantenedores.titulo-editar-proveedor';
    estadosArr = jsonToArray(ESTADOS_PROVEEDOR);
  } else {
    tituloModal = 'mantenedores.titulo-agregar-nuevo-proveedor';
  }

  const { proveedor, loading } = useSelector(
    ({ proveedorApp }) => ({
      proveedor: proveedorApp.proveedor,
      loading: proveedorApp.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (idProveedor) {
      dispatch(getProveedor(idProveedor));
    }
  }, [dispatch, idProveedor]);

  const SignupSchema = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-proveedor-vacio'])
      .max(50, messages['error.max-largo-descripcion']),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
  });

  const SignupSchemaEdit = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-proveedor-vacio'])
      .max(50, messages['error.max-largo-descripcion']),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
    idEstado: Yup.string().required(messages['error.seleccionar-estado']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    resetForm({});
    setSubmitting(false);

    if (idProveedor) {
      payload.idProveedor = idProveedor;
      payload.idEstado = getSelectValue(values.idEstado);

      dispatch(updProveedor(payload));
      setIdProveedor(null);
    } else dispatch(insProveedor(payload));

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setIdProveedor(null);
    setErrors({});
    resetForm({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        glosa: idProveedor && loading ? proveedor.glosa : '',
        descripcion: idProveedor && loading ? proveedor.descripcion : '',
        datosAdicionales: {},
        idEstado: idProveedor && loading ? proveedor.id_estado : '',
      }}
      validationSchema={idProveedor ? SignupSchemaEdit : SignupSchema}
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
              <IntlMessages id={tituloModal} />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.nombre-proveedor" />
                </Label>
                <Field
                  className="form-control"
                  name="glosa"
                  autoComplete="off"
                />
                {errors.glosa && touched.glosa ? (
                  <div className="invalid-feedback d-block">{errors.glosa}</div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.description" />
                </Label>
                <Field
                  className="form-control"
                  name="descripcion"
                  component="textarea"
                />
                {errors.descripcion && touched.descripcion ? (
                  <div className="invalid-feedback d-block">
                    {errors.descripcion}
                  </div>
                ) : null}
              </FormGroup>
              {idProveedor && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.estado" />
                  </Label>
                  <FormikReactSelect
                    name="idEstado"
                    id="idEstado"
                    value={estadosArr.find(
                      (option) => option.value === values.idEstado
                    )}
                    options={estadosArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-estado']}
                  />
                  {errors.idEstado && touched.idEstado ? (
                    <div className="invalid-feedback d-block">
                      {errors.idEstado}
                    </div>
                  ) : null}
                </FormGroup>
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

export default injectIntl(AddNewProvider);
