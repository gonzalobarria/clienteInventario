import React from 'react';
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
import IntlMessages from '../../helpers/IntlMessages';
import { onWheel } from '../../helpers/Utils';

const ModifyQuantityProductClient = ({
  modalOpen,
  toggleModal,
  intl,
  idCliente,
  item,
  accion,
}) => {
  const { messages } = intl;
  const { id: idProducto, precioVentaOriginal } = item || {};

  // const {
  //   params: { idCliente },
  // } = match;

  const validationSchema = Yup.object().shape({
    precioVenta: Yup.number().required(messages['error.precio-venta-vacio']),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      idProducto,
      idCliente,
      action: 'update',
    };

    resetForm({});
    setSubmitting(false);

    accion(payload);

    toggleModal();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ precioVenta: Number(precioVentaOriginal) }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Modal
          isOpen={modalOpen}
          toggle={toggleModal}
          wrapClassName="modal-right disable-text-selection"
          backdrop="static"
        >
          <Form className="av-tooltip tooltip-label-right" onWheel={onWheel}>
            <ModalHeader toggle={toggleModal}>
              <IntlMessages id="cliente.modificar-precio-venta" />
            </ModalHeader>
            <ModalBody>
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
              <Button color="secondary" outline onClick={toggleModal}>
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

export default injectIntl(ModifyQuantityProductClient);
