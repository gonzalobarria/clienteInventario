import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewCategory from '../../../containers/pages/AddNewCategory';
import { getCategorias } from '../../../redux/actions';
import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades } from '../../../helpers/Utils';
import AgrupadorVistasPaginas from '../../../containers/pages/AgrupadorVistasPaginas';
import { NotificationManager } from '../../../components/common/react-notifications';
import { pageSizes } from '../../../constants/defaultValues';

const ListadoCategorias = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = [
    { id: 1, label: messages['opciones.nombre-categoria'] },
    { id: 3, label: messages['opciones.estado'] },
  ];

  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [idCategoria, setIdCategoria] = useState(null);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [functionalities, setFunctionalities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades([Funcionalidades.Actualizar_Categoria]),
    });
  }, []);

  const { categorias, loading } = useSelector(
    ({ categoriasApp }) => ({
      categorias: categoriasApp.categorias,
      loading: categoriasApp.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (loading && categorias.errorMsg) {
      NotificationManager.error(
        messages['error.titulo-categoria-error'],
        messages[categorias.errorMsg],
        5000,
        null,
        null,
        'filled'
      );
      categorias.errorMsg = '';
    }
  }, [loading, categorias, messages]);

  useEffect(() => {
    dispatch(
      getCategorias({
        currentPage,
        selectedPageSize,
        selectedOrderOption,
        search,
      })
    );
  }, [dispatch, currentPage, selectedPageSize, selectedOrderOption, search]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);
    setIdCategoria(idItem);
  };

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading="menu.listado-categorias"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        changeOrderBy={(id) => {
          setSelectedOrderOption(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={categorias.totalItem}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={limpiarBusqueda}
        search={categorias.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={() => setModalOpen(!modalOpen)}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Agregar_Categoria,
        ])}
      />
      <AddNewCategory
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        idCategoria={idCategoria}
        setIdCategoria={setIdCategoria}
      />
      <AgrupadorVistasPaginas
        items={categorias.data}
        displayMode={displayMode}
        currentPage={currentPage}
        totalPage={categorias.totalPage}
        onChangePage={setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoCategorias);
