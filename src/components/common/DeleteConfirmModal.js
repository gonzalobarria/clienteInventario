import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const DeleteConfirmModal = ({
  message,
  accion,
  item,
  modalOpen,
  toggleModal,
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader>
        <IntlMessages id="modal.confirmar-eliminacion" />
      </ModalHeader>
      <ModalBody className="text-center text-modal">{message}</ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="modal.cancelar" />
        </Button>{' '}
        <Button color="primary" onClick={() => accion(item.id)}>
          <IntlMessages id="modal.eliminar" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmModal;
