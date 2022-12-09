/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import es_ES from 'filepond/locale/es-es.js';
import { setOptions } from 'filepond';
import IntlMessages from '../../helpers/IntlMessages';

setOptions(es_ES);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadPhoto = ({
  modalBasic,
  toggleModal,
  dispatchFunction,
  setAppend,
}) => {
  const dispatch = useDispatch();

  const [imgCollection, setImgCollection] = useState('');

  const onFileChange = (files) => {
    const items = files.map((fileItem) => fileItem.file);
    /* if (items.length > 0) {
      items.map((item) => {
        if (item.size > 600000) {
          return false;
        }
      });
    } */
    setImgCollection([...imgCollection, items]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const img in imgCollection[0]) {
      formData.append('imgCollection', imgCollection[0][img]);
    }

    setAppend(formData);
    dispatch(dispatchFunction(formData));
    setImgCollection('');
    toggleModal();
  };

  return (
    <Modal isOpen={modalBasic} toggle={toggleModal}>
      <ModalHeader>
        <IntlMessages id="upload.titulo" />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit}>
          <div className="filepond-wrapper">
            <FilePond
              files={imgCollection}
              allowMultiple={false}
              server={null}
              instantUpload={false}
              credits={false}
              onupdatefiles={(fileItems) => onFileChange(fileItems)}
            />
          </div>
          <div className="rtl">
            <Button color="primary" type="submit">
              <IntlMessages id="upload.cargar-imagen" />
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              <IntlMessages id="upload.cancelar" />
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(UploadPhoto);
