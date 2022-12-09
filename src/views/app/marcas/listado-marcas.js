import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewBrand from '../../../containers/pages/AddNewBrand';
import { getMarcas } from '../../../redux/actions';
import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades } from '../../../helpers/Utils';
import AgrupadorVistasPaginas from '../../../containers/pages/AgrupadorVistasPaginas';
import { NotificationManager } from '../../../components/common/react-notifications';
import { pageSizes } from '../../../constants/defaultValues';

const ListadoMarcas = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = [
    { id: 1, label: messages['opciones.nombre-marca'] },
    { id: 3, label: messages['opciones.estado'] },
  ];

  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [idMarca, setIdMarca] = useState(null);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [functionalities, setFunctionalities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades([Funcionalidades.Actualizar_Marca]),
    });
  }, []);

  const { marcas, loading } = useSelector(
    ({ marcasApp }) => ({
      marcas: marcasApp.marcas,
      loading: marcasApp.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (loading && marcas.errorMsg) {
      NotificationManager.error(
        messages['error.titulo-marca-error'],
        messages[marcas.errorMsg],
        5000,
        null,
        null,
        'filled'
      );
      marcas.errorMsg = '';
    }
  }, [loading, marcas, messages]);

  useEffect(() => {
    dispatch(
      getMarcas({ currentPage, selectedPageSize, selectedOrderOption, search })
    );
  }, [dispatch, currentPage, selectedPageSize, selectedOrderOption, search]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);
    setIdMarca(idItem);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(1);
  };

  return !loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading="menu.listado-marcas"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        changeOrderBy={(id) => {
          setSelectedOrderOption(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={marcas.totalItem}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={limpiarBusqueda}
        search={marcas.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={() => setModalOpen(!modalOpen)}
        showAddNewButton={checkFuncionalidades([Funcionalidades.Agregar_Marca])}
      />
      <AddNewBrand
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        idMarca={idMarca}
        setIdMarca={setIdMarca}
      />
      <AgrupadorVistasPaginas
        items={marcas.data}
        displayMode={displayMode}
        currentPage={currentPage}
        totalPage={marcas.totalPage}
        onChangePage={setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoMarcas);
