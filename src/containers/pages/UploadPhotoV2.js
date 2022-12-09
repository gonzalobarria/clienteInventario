/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import es_ES from 'filepond/locale/es-es.js';
import { setOptions } from 'filepond';

import IntlMessages from '../../helpers/IntlMessages';
import { dataURIToBlob, resizeFile } from '../../helpers/Utils';

setOptions(es_ES);
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

const UploadPhotoV2 = ({
  intl,
  modalPhoto,
  toggleModal,
  subirFoto,
  setAppend,
}) => {
  const { messages } = intl;

  const [imgCollection, setImgCollection] = useState('');

  const onFileChange = (files) => {
    const items = files.map((fileItem) => fileItem.file);

    setImgCollection([...imgCollection, items]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      Array.isArray(imgCollection) &&
      imgCollection.length > 0 &&
      Array.isArray(imgCollection[0]) &&
      imgCollection[0].length > 0
    ) {
      const formData = new FormData();

      const image = await resizeFile(imgCollection[0][0]);
      const newFile = dataURIToBlob(image);
      formData.append('imgCollection', newFile);

      setAppend(formData);
      subirFoto(formData);
    }

    setImgCollection('');
    toggleModal();
  };

  return (
    <Modal isOpen={modalPhoto} toggle={toggleModal}>
      <ModalHeader>
        <IntlMessages id="upload.cargar-imagen" />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit}>
          <div className="filepond-wrapper">
            <FilePond
              files={imgCollection}
              allowMultiple={false}
              captureMethod
              labelIdle={messages['upload.carga-desc']}
              server={null}
              instantUpload={false}
              credits={false}
              onupdatefiles={onFileChange}
            />
          </div>
          <div className="rtl">
            {Array.isArray(imgCollection) && imgCollection[0]?.length > 0 && (
              <Button color="primary" type="submit">
                <IntlMessages id="upload.cargar-imagen" />
              </Button>
            )}{' '}
            <Button color="secondary" onClick={toggleModal}>
              <IntlMessages id="upload.cancelar" />
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default injectIntl(UploadPhotoV2);
