import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import IntlMessages from '../../helpers/IntlMessages';
import UploadPhotoV2 from '../pages/UploadPhotoV2';

const ImagenDetalle = ({ src, folder, id, idTitle, subirFoto }) => {
  const [modalPhoto, setModalPhoto] = useState(false);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);
  const [srcOldPhoto, setSrcOldPhoto] = useState(null);

  useEffect(() => {
    if (updatingPhoto) {
      if (!srcOldPhoto) {
        setSrcOldPhoto(src);
      } else if (srcOldPhoto !== src) {
        setUpdatingPhoto(false);
        setSrcOldPhoto(null);
      }
    }
  }, [src, updatingPhoto, srcOldPhoto]);

  return (
    <>
      <div className="position-absolute card-top-buttons">
        <Button color="primary" size="xs" onClick={() => setModalPhoto(true)}>
          <IntlMessages id="photo.cambiar" />
        </Button>
      </div>
      {modalPhoto && (
        <UploadPhotoV2
          modalPhoto={modalPhoto}
          toggleModal={() => setModalPhoto(!modalPhoto)}
          setAppend={(formData) => {
            formData.append('folder', folder);
            formData.append(idTitle, id);
            setUpdatingPhoto(true);
          }}
          subirFoto={subirFoto}
        />
      )}
      <img
        src={src}
        alt="Detail"
        className={`card-img-top ${updatingPhoto ? 'opacity-50' : ''}`}
      />
    </>
  );
};

export default ImagenDetalle;
