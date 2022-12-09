import { useState } from 'react';

const useModal = () => {
  const [item, setItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const editItem = (i) => {
    setModalOpen(!modalOpen);
    setItem(i);
  };

  const toggleModal = () => editItem(null);

  return { modalOpen, toggleModal, editItem, item };
};

export default useModal;
