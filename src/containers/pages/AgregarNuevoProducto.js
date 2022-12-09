import React, { useState } from 'react';
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
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { FormikReactSelect } from '../form-validations/FormikFields';
import {
  comboConvert,
  estadosArr,
  getSelectValue,
  onWheel,
} from '../../helpers/Utils';
import IntlMessages from '../../helpers/IntlMessages';
import useMarcasActivas from '../../hooks/marcas/use-marcas-activas';
import useCategoriasActivas from '../../hooks/categorias/use-categorias-activas';

const AgregarNuevoProducto = ({
  modalOpen,
  toggleModal,
  intl,
  producto,
  accion,
}) => {
  const { messages } = intl;
  const [loadMA, setLoadMA] = useState(false);
  const [loadCA, setLoadCA] = useState(false);

  const getPrecioMayor = (precioEmbalaje, unidadesEmbalaje, unidadesVenta) =>
    precioEmbalaje && unidadesEmbalaje && unidadesVenta
      ? Math.round((precioEmbalaje / unidadesEmbalaje) * unidadesVenta)
      : 0;

  const CampoPrecioMayor = (props) => {
    const {
      values: { unidadesEmbalaje, unidadesVenta, precioEmbalaje },
      initialValues: init,
      touched,
      setFieldValue,
      isSubmitting,
    } = useFormikContext();
    const [field] = useField(props);
    const { name } = props;

    React.useEffect(() => {
      if (
        (unidadesEmbalaje !== init.unidadesEmbalaje ||
          unidadesVenta !== init.unidadesVenta ||
          precioEmbalaje !== init.precioEmbalaje) &&
        (touched.unidadesEmbalaje ||
          touched.unidadesVenta ||
          touched.precioEmbalaje) &&
        !isSubmitting
      )
        setFieldValue(
          name,
          getPrecioMayor(precioEmbalaje, unidadesEmbalaje, unidadesVenta)
        );
    }, [
      unidadesVenta,
      unidadesEmbalaje,
      touched.unidadesEmbalaje,
      touched.unidadesVenta,
      touched.precioEmbalaje,
      init.unidadesEmbalaje,
      init.unidadesVenta,
      init.precioEmbalaje,
      setFieldValue,
      name,
      precioEmbalaje,
      isSubmitting,
    ]);

    return <Field {...props} {...field} />;
  };

  let tituloModal = '';

  if (producto) {
    tituloModal = 'mantenedores.titulo-editar-producto';
  } else {
    tituloModal = 'mantenedores.titulo-agregar-nuevo-producto';
  }

  const { marcas, isLoading: isLoadingMA } = useMarcasActivas(loadMA);
  const { categorias, isLoading: isLoadingCA } = useCategoriasActivas(loadCA);

  if (modalOpen && !loadMA && !loadCA) {
    setLoadMA(true);
    setLoadCA(true);
  }

  const validationSchema = Yup.object().shape({
    idMarca: Yup.string().notRequired(messages['error.combo-marcas']),
    idCategoria: Yup.string().nullable(),
    glosa: Yup.string()
      .required(messages['error.nombre-producto-vacio'])
      .max(150, messages['error.max-largo-descripcion']),
    descripcion: Yup.string()
      .notRequired()
      .max(250, messages['error.max-largo-descripcion']),
    precioDetalle: Yup.number()
      .notRequired()
      .max(500000, messages['error.max-largo-descripcion']),
    precioMayor: Yup.number()
      .notRequired()
      .max(500000, messages['error.max-largo-descripcion']),
    precioEmbalaje: Yup.number()
      .notRequired()
      .max(500000, messages['error.max-largo-descripcion']),
    unidadesEmbalaje: Yup.number()
      .notRequired()
      .max(500000, messages['error.max-largo-descripcion']),
    unidadesVenta: Yup.number()
      .notRequired()
      .max(500000, messages['error.max-largo-descripcion']),
    barcode: Yup.string()
      .notRequired()
      .max(50, messages['error.max-largo-descripcion']),
    sku: Yup.string()
      .notRequired()
      .max(50, messages['error.max-largo-descripcion']),
    activo: Yup.string().when('isEdicion', {
      is: true,
      then: Yup.string().required(messages['error.seleccionar-activo']),
    }),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idMarca: getSelectValue(values.idMarca),
      idCategoria: getSelectValue(values.idCategoria),
    };

    resetForm({});
    setSubmitting(false);

    if (producto) {
      payload.idProducto = producto.id;
      payload.activo = getSelectValue(values.activo);

      accion(payload);
    } else accion(payload, true);

    toggleModal();
  };

  let marcasArr;
  let categoriasArr;

  if (!isLoadingMA) marcasArr = marcas.map(comboConvert);
  if (!isLoadingCA) categoriasArr = categorias.map(comboConvert);

  const cerrarPopup = ({ setErrors, resetForm }) => {
    setErrors({});
    resetForm({});
    toggleModal();
  };

  const onKeyDown = (e) =>
    e.key === 'Enter' && e.target.name === 'barcode'
      ? e.preventDefault()
      : null;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        glosa: producto?.glosa ?? '',
        idCategoria: producto?.id_categoria ?? '',
        idMarca: producto?.id_marca ?? '',
        descripcion: producto?.descripcion ?? '',
        precioDetalle: producto?.precio_detalle ?? '',
        precioMayor: producto?.precio_mayor ?? '',
        precioEmbalaje: producto?.precio_embalaje ?? '',
        unidadesEmbalaje: producto?.unidades_embalaje ?? '',
        unidadesVenta: producto?.unidades_venta ?? '',
        barcode: producto?.barcode ?? '',
        sku: producto?.sku ?? '',
        activo: producto?.activo ?? '',
        isEdicion: !!producto,
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
        resetForm,
        touched,
      }) => (
        <Modal
          isOpen={modalOpen}
          toggle={() => cerrarPopup({ setErrors, resetForm })}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form
            className="av-tooltip tooltip-label-right"
            onKeyDown={onKeyDown}
            onWheel={onWheel}
          >
            <ModalHeader toggle={() => cerrarPopup({ setErrors, resetForm })}>
              <IntlMessages id={tituloModal} />
            </ModalHeader>
            <ModalBody>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="mantenedores.nombre-producto" />
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
              {!isLoadingMA && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.marca" />
                  </Label>
                  <FormikReactSelect
                    name="idMarca"
                    id="idMarca"
                    value={marcasArr.find(
                      (option) => option.value === values.idMarca
                    )}
                    options={marcasArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-marca']}
                  />
                  {errors.idMarca && touched.idMarca ? (
                    <div className="invalid-feedback d-block">
                      {errors.idMarca}
                    </div>
                  ) : null}
                </FormGroup>
              )}
              {!isLoadingCA && (
                <FormGroup className="error-l-100 has-float-label">
                  <Label>
                    <IntlMessages id="mantenedores.categoria" />
                  </Label>
                  <FormikReactSelect
                    name="idCategoria"
                    id="idCategoria"
                    value={categoriasArr.find(
                      (option) => option.value === values.idCategoria
                    )}
                    options={categoriasArr}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder={messages['mantenedores.seleccionar-categoria']}
                  />
                  {errors.idCategoria && touched.idCategoria ? (
                    <div className="invalid-feedback d-block">
                      {errors.idCategoria}
                    </div>
                  ) : null}
                </FormGroup>
              )}
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
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.unidades-por-venta" />
                </Label>
                <Field
                  className="form-control"
                  name="unidadesVenta"
                  autoComplete="off"
                  type="number"
                />
                {errors.unidadesVenta && touched.unidadesVenta ? (
                  <div className="invalid-feedback d-block">
                    {errors.unidadesVenta}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.precio-detalle" />
                </Label>
                <Field
                  className="form-control"
                  name="precioDetalle"
                  autoComplete="off"
                  type="number"
                />
                {errors.precioDetalle && touched.precioDetalle ? (
                  <div className="invalid-feedback d-block">
                    {errors.precioDetalle}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.precio-por-mayor" />
                </Label>
                <CampoPrecioMayor
                  className="form-control"
                  name="precioMayor"
                  autoComplete="off"
                  type="number"
                />
                {errors.precioMayor && touched.precioMayor ? (
                  <div className="invalid-feedback d-block">
                    {errors.precioMayor}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.precio-por-embalaje" />
                </Label>
                <Field
                  className="form-control"
                  name="precioEmbalaje"
                  autoComplete="off"
                  type="number"
                />
                {errors.precioEmbalaje && touched.precioEmbalaje ? (
                  <div className="invalid-feedback d-block">
                    {errors.precioEmbalaje}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.unidades-por-embalaje" />
                </Label>
                <Field
                  className="form-control"
                  name="unidadesEmbalaje"
                  autoComplete="off"
                  type="number"
                />
                {errors.unidadesEmbalaje && touched.unidadesEmbalaje ? (
                  <div className="invalid-feedback d-block">
                    {errors.unidadesEmbalaje}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.barcode" />
                </Label>
                <Field
                  className="form-control"
                  name="barcode"
                  autoComplete="off"
                />
                {errors.barcode && touched.barcode ? (
                  <div className="invalid-feedback d-block">
                    {errors.barcode}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100 has-float-label">
                <Label>
                  <IntlMessages id="productos.sku" />
                </Label>
                <Field className="form-control" name="sku" autoComplete="off" />
                {errors.sku && touched.sku ? (
                  <div className="invalid-feedback d-block">{errors.sku}</div>
                ) : null}
              </FormGroup>
              {producto && (
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

export default injectIntl(AgregarNuevoProducto);
