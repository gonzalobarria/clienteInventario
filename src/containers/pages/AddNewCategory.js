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
import {
  getCategoria,
  getCategoriasActivas,
  insCategoria,
  updCategoria,
} from '../../redux/actions';
import { FormikReactSelect } from '../form-validations/FormikFields';
import {
  comboConvert,
  estadosArr,
  getSelectValue,
  onWheel,
} from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';

const AddNewCategory = ({
  modalOpen,
  toggleModal,
  intl,
  idCategoria,
  setIdCategoria,
}) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  let tituloModal = '';

  if (idCategoria) {
    tituloModal = 'mantenedores.titulo-editar-categoria';
  } else {
    tituloModal = 'mantenedores.titulo-agregar-nueva-categoria';
  }

  const { categoria, loading } = useSelector(
    ({ categoriaApp }) => ({
      categoria: categoriaApp.categoria,
      loading: categoriaApp.loading,
    }),
    shallowEqual
  );

  const { categoriasActivas, loadingCA } = useSelector(
    ({ categoriasApp }) => ({
      categoriasActivas: categoriasApp.categoriasActivas,
      loadingCA: categoriasApp.loadingCA,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (modalOpen) {
      dispatch(getCategoriasActivas());
      if (idCategoria) {
        dispatch(getCategoria(idCategoria));
      }
    }
  }, [dispatch, modalOpen, idCategoria]);

  const SignupSchema = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-categoria-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    idCategoriaPadre: Yup.string().nullable(),
  });

  const SignupSchemaEdit = Yup.object().shape({
    glosa: Yup.string()
      .required(messages['error.nombre-proveedor-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    activo: Yup.string().required(messages['error.seleccionar-estado']),
    idCategoriaPadre: Yup.string().nullable(),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };

    if (values.idCategoriaPadre === undefined) delete payload.idCategoriaPadre;
    else if (values.idCategoriaPadre.value !== undefined)
      payload.idCategoriaPadre = values.idCategoriaPadre.value;
    else payload.idCategoriaPadre = values.idCategoriaPadre;

    resetForm({});
    setSubmitting(false);

    if (idCategoria) {
      payload.idCategoria = idCategoria;
      payload.activo = getSelectValue(values.activo);

      dispatch(updCategoria(payload));
      setIdCategoria(null);
    } else dispatch(insCategoria(payload));

    toggleModal();
  };

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setIdCategoria(null);
    setErrors({});
    resetForm({});
    toggleModal();
  };

  let categoriasArr;

  if (loadingCA)
    categoriasArr = categoriasActivas
      .filter((c) => !c.id_categoria_padre)
      .map(comboConvert);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        glosa: idCategoria && loading ? categoria.glosa : '',
        idCategoriaPadre:
          idCategoria && loading ? categoria.id_categoria_padre : '',
        datosAdicionales: {},
        activo: idCategoria && loading ? categoria.activo : '',
      }}
      validationSchema={idCategoria ? SignupSchemaEdit : SignupSchema}
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
                  <IntlMessages id="mantenedores.nombre-categoria" />
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
              {idCategoria && (
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
              {loadingCA && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.categoria-padre" />
                  </Label>
                  <FormikReactSelect
                    name="idCategoriaPadre"
                    id="idCategoriaPadre"
                    value={categoriasArr.find(
                      (option) => option.value === values.idCategoriaPadre
                    )}
                    options={categoriasArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-categoria']}
                  />
                  {errors.idCategoriaPadre && touched.idCategoriaPadre ? (
                    <div className="invalid-feedback d-block">
                      {errors.idCategoriaPadre}
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

export default injectIntl(AddNewCategory);
