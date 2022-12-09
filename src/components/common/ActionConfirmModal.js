import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const ActionConfirmModal = ({
  message,
  accion,
  modalOpen,
  toggleModal,
  titleButton,
  titleModal,
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} backdrop="static">
      <ModalHeader>
        <IntlMessages id={titleModal} />
      </ModalHeader>
      <ModalBody className="text-center text-modal">{message}</ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="modal.cancelar" />
        </Button>{' '}
        <Button color="primary" onClick={accion}>
          <IntlMessages id={titleButton} />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionConfirmModal;
