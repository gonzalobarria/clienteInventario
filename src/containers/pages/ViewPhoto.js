import React from 'react';
import { injectIntl } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';

const ViewPhoto = ({ modalBasic, toggleModal, imgURL }) => {
  return (
    <Modal isOpen={modalBasic} toggle={toggleModal}>
      <ModalHeader>
        <IntlMessages id="photo.titulo" />
      </ModalHeader>
      <ModalBody>
        <div className="filepond-wrapper">
          <img src={imgURL} alt="Detail" className="card-img-top" />
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="rtl">
          <Button color="primary" onClick={toggleModal}>
            <IntlMessages id="photo.cerrar" />
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default injectIntl(ViewPhoto);
