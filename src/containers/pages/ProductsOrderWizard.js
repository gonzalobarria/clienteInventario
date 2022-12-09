/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { createRef, useEffect, useState } from 'react';
import { Button, Card, CardBody, FormGroup, Label } from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import IntlMessages from '../../helpers/IntlMessages';
import BottomNavigation from '../../components/wizard/BottomNavigation';
import TopNavigation from '../../components/wizard/TopNavigation';
import {
  FormikCustomRadioGroup,
  FormikReactSelect,
} from '../form-validations/FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';
import {
  getAlmacenesActivos,
  getProductosAlmacen,
  getProductosProveedor,
  getProveedoresActivos,
  getTiposAlmacen,
} from '../../redux/actions';
import ProductsOrder from './ProductsOrder';
import { NotificationManager } from '../../components/common/react-notifications';
import { TIPOS_ALMACEN } from '../../constants/enums';
import {
  comboConvert,
  getSelectLabel,
  getSelectValue,
  onWheel,
} from '../../helpers/Utils';

const ProductosProveedor = (props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const field = props.fields.find((f) => f.name === 'idProveedor');
    const idProveedor = field?.value;

    if (idProveedor) {
      setFieldValue(props.name, []);
      setFieldTouched(props.name, true, false);
      dispatch(getProductosProveedor(idProveedor));
    }
  }, [dispatch, props.fields, props.name, setFieldValue, setFieldTouched]);

  return <></>;
};

const ProductosBodega = (props) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const dispatch = useDispatch();

  useEffect(() => {
    const field = props.fields.find((f) => f.name === 'idAlmacenOrigen');
    const idAlmacen = field?.value;

    if (idAlmacen) {
      setFieldValue(props.name, []);
      setFieldTouched(props.name, true, false);
      dispatch(getProductosAlmacen(idAlmacen));
    }
  }, [dispatch, props.fields, props.name, setFieldValue, setFieldTouched]);

  return <></>;
};

const CargaAlmacenes = (props) => {
  const {
    values: { idTipoAlmacenDestino },
    setFieldValue,
  } = useFormikContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (idTipoAlmacenDestino !== '') {
      setFieldValue(props.name, []);
      dispatch(getAlmacenesActivos(idTipoAlmacenDestino));
    }
  }, [dispatch, props.fields, props.name, setFieldValue, idTipoAlmacenDestino]);

  return <></>;
};

const CargaProveedor = (props) => {
  const {
    values: { origen },
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  const dispatch = useDispatch();

  useEffect(() => {
    if (origen === 1) {
      setFieldValue(props.name, []);
      setFieldTouched(props.name, true, false);
      if (!props.loadingProv) dispatch(getProveedoresActivos());
    }
    if (origen === 2) {
      setFieldValue('idAlmacenOrigen', []);
      setFieldTouched('idAlmacenOrigen', true, false);
      dispatch(getAlmacenesActivos(TIPOS_ALMACEN.BODEGA));
    }
  }, [
    origen,
    dispatch,
    props.fields,
    props.name,
    props.loadingProv,
    setFieldValue,
    setFieldTouched,
  ]);

  return <></>;
};

const ProductsOrderWizard = ({ intl, creaOrden }) => {
  const { messages } = intl;
  const dispatch = useDispatch();

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [glosaOrigen, setGlosaOrigen] = useState('');
  const [glosaDestino, setGlosaDestino] = useState('');
  const [productosOrden, setProductosOrden] = useState([]);
  const [tmpOrigen, setTmpOrigen] = useState('');
  const [tmpIdOrigen, setTmpIdOrigen] = useState('');
  const [maxQty, setMaxQty] = useState(0);

  const unidadesMedida = [
    { label: 'Unidad', value: 1 },
    { label: 'Caja', value: 2 },
  ];

  const [fields, setFields] = useState([
    {
      valid: false,
      name: 'idProveedor',
      value: '',
    },
    {
      valid: false,
      name: 'idAlmacenDestino',
      value: '',
    },
    {
      valid: false,
      name: 'idAlmacenOrigen',
      value: '',
    },
    {
      valid: false,
      name: 'idTipoAlmacenDestino',
      value: '',
    },
    {
      valid: false,
      name: 'idProducto',
      value: '',
    },
    {
      valid: false,
      name: 'cantidad',
      value: 0,
    },
    {
      valid: false,
      name: 'idUnidadMedida',
      value: 2,
    },
    {
      valid: false,
      name: 'origen',
      value: '',
    },
  ]);

  let provArr;
  let prodArr;
  let almacenesArr;
  let tiposAlmacenArr;

  const glosas = (key, value) => {
    if (value.label) {
      if (key === 'idProveedor' || key === 'idAlmacenOrigen')
        setGlosaOrigen(value.label);
      if (key === 'idAlmacenDestino') setGlosaDestino(value.label);
    }
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    form.submitForm().then(() => {
      const newFields = [...fields];

      Object.entries(form.values).forEach(([key, value]) => {
        glosas(key, value);
        newFields.forEach((field) => {
          if (field.name === key) {
            field.value = value.value ? value.value : value;

            if (Array.isArray(value)) field.value = '';
          }
        });
        setFields(newFields);
      });

      let sinErrores = false;
      if (formIndex === 0) {
        sinErrores =
          !form.errors.origen &&
          form.touched.origen &&
          !form.errors.idProveedor &&
          !form.errors.idAlmacenOrigen;

        setTmpOrigen(form.values.origen);
        setTmpIdOrigen(form.values.idAlmacenOrigen.value);
      }
      if (formIndex === 1) {
        sinErrores =
          !form.errors.idTipoAlmacenDestino &&
          form.touched.idTipoAlmacenDestino &&
          !form.errors.idAlmacenDestino;
      }

      if (sinErrores) {
        goToNext();
        step.isDone = true;
        if (steps.length - 1 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
        }
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const SignupSchema0 = Yup.object().shape({
    origen: Yup.string().required(messages['orden.seleccionar-origen']),
    idProveedor: Yup.string().when('origen', {
      is: (value) => value === 1,
      then: Yup.string().required(messages['orden.seleccionar-proveedor']),
    }),
    idAlmacenOrigen: Yup.string().when('origen', {
      is: (value) => value === 2,
      then: Yup.string().required(messages['orden.seleccionar-bodega']),
    }),
  });

  const SignupSchema1 = Yup.object().shape({
    idTipoAlmacenDestino: Yup.string().required(
      messages['orden.seleccionar-almacen-destino']
    ),
    idAlmacenDestino: Yup.string().when('idTipoAlmacenDestino', {
      is: (value) => parseInt(value, 10) === TIPOS_ALMACEN.BODEGA,
      then: Yup.string().required(messages['orden.seleccionar-bodega']),
      otherwise: Yup.string().required(messages['orden.seleccionar-local']),
    }),
  });

  const SignupSchema2 = Yup.object().shape({
    idProducto: Yup.string().required(messages['orden.seleccionar-producto']),
    idUnidadMedida: Yup.string().required(
      messages['orden.seleccionar-unidad-medida']
    ),
    cantidad: Yup.number()
      .positive(messages['error.mayor-cero'])
      .integer(messages['error.numero-entero'])
      .max(maxQty, `${messages['error.cantidad-maxima']} ${maxQty}`)
      .required(messages['error.cantidad-vacia']),
  });

  const { proveedores, loadingProv } = useSelector(
    ({ proveedoresApp }) => ({
      proveedores: proveedoresApp.proveedoresActivos,
      loadingProv: proveedoresApp.loadingPA,
    }),
    shallowEqual
  );

  const {
    productosProveedor,
    productosAlmacen,
    loadingProd,
    loadingPA,
  } = useSelector(
    ({ productosApp }) => ({
      productosProveedor: productosApp.productosProveedor,
      productosAlmacen: productosApp.productosAlmacen,
      loadingProd: productosApp.loadingPP,
      loadingPA: productosApp.loadingPA,
    }),
    shallowEqual
  );

  const { almacenes, loadingAlmacenes } = useSelector(
    ({ tiposAlmacenApp }) => ({
      almacenes: tiposAlmacenApp.almacenesActivos,
      loadingAlmacenes: tiposAlmacenApp.loadingAA,
    }),
    shallowEqual
  );

  const { tiposAlmacen, loadingTiposAlmacen } = useSelector(
    ({ tiposAlmacenApp }) => ({
      tiposAlmacen: tiposAlmacenApp.tiposAlmacen,
      loadingTiposAlmacen: tiposAlmacenApp.loading,
    }),
    shallowEqual
  );

  const fuenteOrigen = [
    { value: 1, label: messages['mantenedores.proveedor'] },
    { value: 2, label: messages['mantenedores.bodega'] },
  ];

  useEffect(() => {
    dispatch(getTiposAlmacen());
  }, [dispatch]);

  const comboOrigenConvert = (item) => ({
    value: item.id,
    label: item.glosa,
    stock: item.stock_disponible,
  });

  if (loadingProv) provArr = proveedores.map(comboConvert);
  if (loadingProd && tmpOrigen === 1) {
    prodArr = productosProveedor.map(comboConvert);

    if (productosOrden.length > 0) {
      prodArr = prodArr.filter((producto) => {
        const prodOrden = productosOrden.find(
          (p) => p.idProducto === producto.value
        );
        return producto.value !== prodOrden?.idProducto;
      });
    }
  }
  if (loadingPA && tmpOrigen === 2) {
    prodArr = productosAlmacen.map(comboOrigenConvert);

    if (productosOrden.length > 0) {
      prodArr = prodArr.filter((producto) => {
        const prodOrden = productosOrden.find(
          (p) => p.idProducto === producto.value
        );
        return producto.value !== prodOrden?.idProducto;
      });
    }
  }

  if (loadingAlmacenes) {
    if (tmpOrigen === 2) {
      almacenesArr = almacenes
        .filter((almacen) => almacen.id !== tmpIdOrigen)
        .map(comboConvert);
    } else almacenesArr = almacenes.map(comboConvert);
  }
  if (loadingTiposAlmacen) tiposAlmacenArr = tiposAlmacen.map(comboConvert);

  const tieneStockDisponible = (idProducto, cantidad) => {
    if (tmpOrigen === 2) {
      const salida = productosAlmacen.filter(
        (producto) =>
          producto.id === idProducto && producto.stock_disponible >= cantidad
      );
      return salida.length > 0;
    }
    if (tmpOrigen === 1) return true;

    return false;
  };

  const sinStockMessage = () => {
    NotificationManager.error(
      'No existen suficientes unidades de este producto',
      'No tiene Stock suficiente',
      3000,
      null,
      null,
      'filled'
    );
  };

  const addProductoOrden = (values, { resetForm }) => {
    const salida = {};
    fields.forEach((field) => {
      salida[field.name] = field.value;
    });
    const idProducto = getSelectValue(values.idProducto);
    const { cantidad } = values;

    if (!tieneStockDisponible(idProducto, cantidad)) sinStockMessage();
    else {
      salida.idProducto = idProducto;
      salida.cantidad = cantidad;
      salida.glosaProducto = getSelectLabel(values.idProducto);
      salida.tipoCompra = getSelectLabel(values.idUnidadMedida);
      salida.idUnidadMedida = getSelectValue(values.idUnidadMedida);

      if (tmpOrigen === 2) {
        const prod = productosAlmacen.filter(
          (producto) => producto.id === idProducto
        );
        if (prod) salida.stockDisponible = prod[0].stock_disponible;
      }
      if (tmpOrigen === 1)
        salida.stockDisponible = process.env.REACT_APP_MAX_PEDIDO;

      setProductosOrden([...productosOrden, salida]);
      setBottomNavHidden(true);
      resetForm({});
      setMaxQty(0);
    }
  };

  const removeProductoOrden = (idProducto, productosOrden) => {
    setProductosOrden(() => {
      const salida = productosOrden.filter(
        (producto) => producto.idProducto !== idProducto
      );

      if (salida.length === 0) {
        setBottomNavHidden(false);
      }
      return salida;
    });
  };

  const editProductoOrden = (
    cantidad,
    idProducto,
    productosOrden,
    idUnidadMedida,
    tipoCompra
  ) => {
    if (!tieneStockDisponible(idProducto, cantidad)) sinStockMessage();
    else
      setProductosOrden(() => {
        const salida = productosOrden.map((producto) => {
          if (producto.idProducto === idProducto) {
            producto.cantidad = cantidad;
            producto.idUnidadMedida = idUnidadMedida;
            producto.tipoCompra = tipoCompra;
          }
          return producto;
        });

        return salida;
      });
  };

  const settingMaxQty = (prod, e, setFieldTouched) => {
    setFieldTouched(e);
    if (prod.stock !== undefined) setMaxQty(prod.stock);
    else if (prod.value !== undefined)
      setMaxQty(process.env.REACT_APP_MAX_PEDIDO);
  };

  return (
    <>
      <Card className="mb-5 col-12">
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation className="justify-content-center" disableNav />
            <Steps>
              <Step
                id="step1"
                name={messages['wizard.step-name-1']}
                desc={messages['orden.origen']}
              >
                <div className="wizard-basic-step">
                  <Formik
                    innerRef={forms[0]}
                    initialValues={{
                      origen: '',
                      idProveedor: [],
                      idAlmacenOrigen: [],
                    }}
                    onSubmit={() => {}}
                    validationSchema={SignupSchema0}
                  >
                    {({
                      setFieldValue,
                      setFieldTouched,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Form className="av-tooltip tooltip-label-right">
                        <FormGroup className="error-l-100">
                          <Label className="d-block">
                            {messages['orden.origen-producto']}
                          </Label>
                          <FormikCustomRadioGroup
                            inline
                            name="origen"
                            id="origen"
                            value={values.origen}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            options={fuenteOrigen}
                          />
                          {errors.origen && touched.origen ? (
                            <div className="invalid-feedback d-block">
                              {errors.origen}
                            </div>
                          ) : null}
                        </FormGroup>
                        <CargaProveedor
                          name="idProveedor"
                          loadingProv={loadingProv}
                          loadingAlmacenes={loadingAlmacenes}
                        />
                        {loadingProv && values.origen === 1 && (
                          <FormGroup className="error-l-100">
                            <FormikReactSelect
                              name="idProveedor"
                              id="idProveedor"
                              value={values.idProveedor}
                              options={provArr}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              placeholder={
                                messages['mantenedores.seleccionar-proveedor']
                              }
                            />
                            {errors.idProveedor && touched.idProveedor ? (
                              <div className="invalid-feedback d-block">
                                {errors.idProveedor}
                              </div>
                            ) : null}
                          </FormGroup>
                        )}
                        {loadingAlmacenes && values.origen === 2 && (
                          <FormGroup className="error-l-100">
                            <FormikReactSelect
                              name="idAlmacenOrigen"
                              id="idAlmacenOrigen"
                              value={values.idAlmacenOrigen}
                              options={almacenesArr}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              placeholder={
                                messages['mantenedores.seleccionar-bodega']
                              }
                            />
                            {errors.idAlmacenOrigen &&
                            touched.idAlmacenOrigen ? (
                              <div className="invalid-feedback d-block">
                                {errors.idAlmacenOrigen}
                              </div>
                            ) : null}
                          </FormGroup>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </Step>
              <Step
                id="step2"
                name={messages['wizard.step-name-2']}
                desc={messages['orden.destino']}
              >
                <div className="wizard-basic-step">
                  <Formik
                    innerRef={forms[1]}
                    initialValues={{
                      idTipoAlmacenDestino: '',
                      idAlmacenDestino: [],
                    }}
                    onSubmit={() => {}}
                    validationSchema={SignupSchema1}
                  >
                    {({
                      setFieldValue,
                      setFieldTouched,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Form className="av-tooltip tooltip-label-right">
                        {loadingTiposAlmacen && (
                          <FormGroup className="error-l-100">
                            <Label className="d-block">
                              {messages['mantenedores.donde-almacenar']}
                            </Label>
                            <FormikCustomRadioGroup
                              inline
                              name="idTipoAlmacenDestino"
                              id="idTipoAlmacenDestino"
                              value={values.idTipoAlmacenDestino}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={tiposAlmacenArr}
                            />
                            {errors.idTipoAlmacenDestino &&
                            touched.idTipoAlmacenDestino ? (
                              <div className="invalid-feedback d-block">
                                {errors.idTipoAlmacenDestino}
                              </div>
                            ) : null}
                          </FormGroup>
                        )}
                        <CargaAlmacenes
                          name="idAlmacenDestino"
                          loadingAlmacenes={loadingAlmacenes}
                        />
                        {loadingAlmacenes && values.idTipoAlmacenDestino && (
                          <FormGroup className="error-l-100">
                            <FormikReactSelect
                              name="idAlmacenDestino"
                              id="idAlmacenDestino"
                              value={values.idAlmacenDestino}
                              options={almacenesArr}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              placeholder={
                                parseInt(values.idTipoAlmacenDestino, 10) ===
                                TIPOS_ALMACEN.BODEGA
                                  ? messages['mantenedores.seleccionar-bodega']
                                  : messages['mantenedores.seleccionar-local']
                              }
                            />
                            {errors.idAlmacenDestino &&
                            touched.idAlmacenDestino ? (
                              <div className="invalid-feedback d-block">
                                {errors.idAlmacenDestino}
                              </div>
                            ) : null}
                          </FormGroup>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </Step>
              <Step
                id="step3"
                name={messages['wizard.step-name-3']}
                desc={messages['orden.productos']}
              >
                <div className="wizard-basic-step">
                  <Formik
                    enableReinitialize
                    innerRef={forms[2]}
                    initialValues={{
                      idProducto: '',
                      cantidad: '',
                      idUnidadMedida: '',
                    }}
                    validationSchema={SignupSchema2}
                    onSubmit={addProductoOrden}
                  >
                    {({
                      setFieldValue,
                      setFieldTouched,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Form
                        className="av-tooltip tooltip-label-right error-l-75"
                        onWheel={onWheel}
                      >
                        <ProductosProveedor name="idProducto" fields={fields} />
                        <ProductosBodega name="idProducto" fields={fields} />
                        {(loadingProd || loadingPA) && (
                          <>
                            <FormGroup row>
                              <Colxx sm={6}>
                                <FormGroup className="error-l-100">
                                  <Label>
                                    <IntlMessages id="mantenedores.producto" />
                                  </Label>
                                  <FormikReactSelect
                                    name="idProducto"
                                    id="idProducto"
                                    value={values.idProducto}
                                    options={prodArr}
                                    onChange={setFieldValue}
                                    onBlur={(e) =>
                                      settingMaxQty(
                                        values.idProducto,
                                        e,
                                        setFieldTouched
                                      )
                                    }
                                    placeholder={
                                      messages[
                                        'mantenedores.seleccionar-producto'
                                      ]
                                    }
                                  />
                                  {errors.idProducto && touched.idProducto ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.idProducto}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Colxx>
                              <Colxx sm={4}>
                                <FormGroup className="error-l-100">
                                  <Label>
                                    <IntlMessages id="mantenedores.unidad-medida" />
                                  </Label>
                                  <FormikReactSelect
                                    name="idUnidadMedida"
                                    id="idUnidadMedida"
                                    value={values.idUnidadMedida}
                                    options={unidadesMedida}
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    placeholder={
                                      messages[
                                        'orden.seleccionar-unidad-medida'
                                      ]
                                    }
                                  />
                                  {errors.idUnidadMedida &&
                                  touched.idUnidadMedida ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.idUnidadMedida}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Colxx>
                              <Colxx sm={2}>
                                <FormGroup className="error-l-100">
                                  <Label for="cantidad">
                                    Cantidad (Máx: {maxQty})
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="cantidad"
                                    id="cantidad"
                                    type="number"
                                  />
                                  {errors.cantidad && touched.cantidad && (
                                    <div className="invalid-feedback d-block">
                                      {errors.cantidad}
                                    </div>
                                  )}
                                </FormGroup>
                              </Colxx>
                            </FormGroup>
                            <div className="text-center pb-3">
                              <Button color="primary" type="submit">
                                <IntlMessages id="orden.agregar-producto-orden" />
                              </Button>
                            </div>
                          </>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </Step>
            </Steps>
            <BottomNavigation
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              className={`justify-content-center ${
                bottomNavHidden && 'invisible'
              }`}
              prevLabel={messages['wizard.prev']}
              nextLabel={messages['wizard.next']}
            />
          </Wizard>
        </CardBody>
      </Card>
      <ProductsOrder
        productos={productosOrden}
        glosaOrigen={glosaOrigen}
        glosaDestino={glosaDestino}
        removeProductoOrden={removeProductoOrden}
        editProductoOrden={editProductoOrden}
        creaOrden={creaOrden}
      />
    </>
  );
};
export default injectIntl(ProductsOrderWizard);
