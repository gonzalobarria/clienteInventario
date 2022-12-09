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
import { getMarca, insMarca, updMarca } from '../../redux/actions';
import { FormikReactSelect } from '../form-validations/FormikFields';
import { estadosArr, getSelectValue, onWheel } from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

const AddNewBrand = ({ modalOpen, toggleModal, intl, idMarca, setIdMarca }) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  const { marca, loading } = useSelector(
    ({ marcaApp }) => ({
      marca: marcaApp.marca,
      loading: marcaApp.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (idMarca) {
      dispatch(getMarca(idMarca));
    }
  }, [dispatch, idMarca]);

  const SignupSchema = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-marca-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
  });

  const SignupSchemaEdit = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-proveedor-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
    activo: Yup.string().required(messages['error.seleccionar-estado']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = { ...values };
    resetForm({});
    setSubmitting(false);

    if (idMarca) {
      payload.idMarca = idMarca;
      payload.activo = getSelectValue(values.activo);

      dispatch(updMarca(payload));
      setIdMarca(null);
    } else dispatch(insMarca(payload));

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setIdMarca(null);
    resetForm({});
    setErrors({});
    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        glosa: idMarca && loading ? marca.glosa : '',
        descripcion: idMarca && loading ? marca.descripcion : '',
        datosAdicionales: {},
        activo: idMarca && loading ? marca.activo : '',
      }}
      validationSchema={idMarca ? SignupSchemaEdit : SignupSchema}
      onSubmit={onSubmit}
    >
      {({
        setFieldValue,
        setFieldTouched,
        setErrors,
        values,
        resetForm,
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
              {idMarca ? (
                <IntlMessages id="mantenedores.titulo-editar-marca" />
              ) : (
                <IntlMessages id="mantenedores.titulo-agregar-nueva-marca" />
              )}
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.nombre-marca" />
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
              {idMarca && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.estado" />
                  </Label>
                  <FormikReactSelect
                    name="activo"
                    id="activo"
                    value={estadosArr.find(
                      (option) => option.value === values.activo
                    )}
                    options={estadosArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-estado']}
                  />
                  {errors.activo && touched.activo ? (
                    <div className="invalid-feedback d-block">
                      {errors.activo}
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

export default injectIntl(AddNewBrand);
