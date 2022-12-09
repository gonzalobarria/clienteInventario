/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { injectIntl } from 'react-intl';
import {
  Button,
  Row,
  Card,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
} from 'reactstrap';

import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import { comboConvert, getSelectValue, onWheel } from '../../helpers/Utils';
import useCategoriasActivas from '../../hooks/categorias/use-categorias-activas';
import useMarcasActivas from '../../hooks/marcas/use-marcas-activas';
import { FormikReactSelect } from '../form-validations/FormikFields';
import useProductosPDF from '../../hooks/descargables/use-productos-pdf';

const Formulario = ({ intl }) => {
  const { messages } = intl;
  const [payload, setPayload] = useState({});

  const { marcas, isLoading: isLoadingMA } = useMarcasActivas(true);
  const { categorias, isLoading: isLoadingCA } = useCategoriasActivas(true);
  const { setDescargaPDF } = useProductosPDF(payload);

  const validationSchema = Yup.object().shape({
    idMarca: Yup.string()
      .nullable()
      .notRequired(messages['error.combo-marcas']),
    idCategoria: Yup.string()
      .nullable()
      .notRequired(messages['error.combo-categorias']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const params = {
      idMarca: getSelectValue(values.idMarca),
      idCategoria: getSelectValue(values.idCategoria),
    };

    setPayload(params);
    setDescargaPDF(true);
    // resetForm({});
    // setSubmitting(false);
    // setDescargaPDF(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ idMarca: '', idCategoria: '' }}
      validationSchema={validationSchema}
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
        <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
          {!isLoadingMA && (
            <FormGroup className="error-l-100 has-float-label">
              <Label>
                <IntlMessages id="mantenedores.marca" />
              </Label>
              <FormikReactSelect
                name="idMarca"
                id="idMarca"
                options={marcas.map(comboConvert)}
                isClearable
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                placeholder={messages['mantenedores.seleccionar-marca']}
              />
              {errors.activo && touched.activo ? (
                <div className="invalid-feedback d-block">{errors.activo}</div>
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
                options={categorias.map(comboConvert)}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                isClearable
                placeholder={messages['mantenedores.seleccionar-categoria']}
              />
              {errors.idCategoria && touched.idCategoria ? (
                <div className="invalid-feedback d-block">
                  {errors.idCategoria}
                </div>
              ) : null}
            </FormGroup>
          )}
          <Button color="primary" type="submit">
            <IntlMessages id="pages.submit" />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const DescargaPDFProductos = ({ intl }) => (
  <Row>
    <Colxx xxs="12" xs="6" className="mb-4">
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="dashboards.descarga-pdf-productos" />
          </CardTitle>
          <Formulario intl={intl} />
        </CardBody>
      </Card>
    </Colxx>
  </Row>
);

export default injectIntl(DescargaPDFProductos);
