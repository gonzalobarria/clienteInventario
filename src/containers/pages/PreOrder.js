/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import IntlMessages from '../../helpers/IntlMessages';
import { FormikReactSelect } from '../form-validations/FormikFields';
import { Colxx } from '../../components/common/CustomBootstrap';

import {
  comboConvert,
  getSelectLabel,
  getSelectValue,
  onWheel,
} from '../../helpers/Utils';
import useProductosActivosOrden from '../../hooks/productos/use-productos-activos-orden';
import ProductsOrder from './ProductsOrder';
import useUnidadesMedida from '../../hooks/unidades-medida/use-unidades-medida';

const PreOrder = ({ intl, activeTab, creaOrden }) => {
  const { messages } = intl;

  const [productosOrden, setProductosOrden] = useState([]);
  const [maxQty, setMaxQty] = useState(0);

  const { productosActivosOrden, isLoading } = useProductosActivosOrden(
    activeTab === 'preOrder'
  );

  const { unidadesMedida, isLoading: isLoadingUM } = useUnidadesMedida();

  // const unidadesMedida = [
  //   { label: 'Unidad', value: 1 },
  //   { label: 'Caja', value: 2 },
  // ];

  let prodArr;

  const validationSchema = Yup.object().shape({
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

  if (!isLoading) {
    prodArr = productosActivosOrden.map(comboConvert);

    if (productosOrden.length > 0) {
      prodArr = prodArr.filter((producto) => {
        const prodOrden = productosOrden.find(
          (p) => p.idProducto === producto.value
        );
        return producto.value !== prodOrden?.idProducto;
      });
    }
  }

  const onSubmit = (values, { resetForm }) => {
    const salida = {
      idProducto: getSelectValue(values.idProducto),
      cantidad: values.cantidad,
      glosaProducto: getSelectLabel(values.idProducto),
      tipoCompra: getSelectLabel(values.idUnidadMedida),
      idUnidadMedida: getSelectValue(values.idUnidadMedida),
      stockDisponible: process.env.REACT_APP_MAX_PEDIDO,
    };

    setProductosOrden([...productosOrden, salida]);
    resetForm({});
    setMaxQty(0);
  };

  const removeProductoOrden = (idProducto, prodOrden) => {
    setProductosOrden(() => {
      const salida = prodOrden.filter(
        (producto) => producto.idProducto !== idProducto
      );

      return salida;
    });
  };

  const editProductoOrden = (
    cantidad,
    idProducto,
    prodOrden,
    idUnidadMedida,
    tipoCompra
  ) => {
    setProductosOrden(() => {
      const salida = prodOrden.map((producto) => {
        if (producto.idProducto === idProducto)
          return {
            ...producto,
            cantidad,
            idUnidadMedida,
            tipoCompra,
          };

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
      <Formik
        enableReinitialize
        initialValues={{
          idProducto: '',
          cantidad: '',
          idUnidadMedida: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
          <Form
            className="av-tooltip tooltip-label-right error-l-75"
            onWheel={onWheel}
          >
            {!isLoading && (
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
                          settingMaxQty(values.idProducto, e, setFieldTouched)
                        }
                        placeholder={
                          messages['mantenedores.seleccionar-producto']
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
                        options={unidadesMedida.map(comboConvert)}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        placeholder={
                          messages['orden.seleccionar-unidad-medida']
                        }
                      />
                      {errors.idUnidadMedida && touched.idUnidadMedida ? (
                        <div className="invalid-feedback d-block">
                          {errors.idUnidadMedida}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={2}>
                    <FormGroup className="error-l-100">
                      <Label for="cantidad">Cantidad (Máx: {maxQty})</Label>
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
                    <IntlMessages id="orden.agregar-producto-pre-orden" />
                  </Button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>

      <ProductsOrder
        productos={productosOrden}
        removeProductoOrden={removeProductoOrden}
        editProductoOrden={editProductoOrden}
        preOrder
        creaOrden={creaOrden}
      />
    </>
  );
};
export default injectIntl(PreOrder);
