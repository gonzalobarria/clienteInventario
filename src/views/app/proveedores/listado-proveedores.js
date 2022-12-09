import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewProvider from '../../../containers/pages/AddNewProvider';
import { getProveedores } from '../../../redux/actions';
import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades } from '../../../helpers/Utils';
import AgrupadorVistasPaginas from '../../../containers/pages/AgrupadorVistasPaginas';
import { NotificationManager } from '../../../components/common/react-notifications';
import { orderOptionsPages, pageSizes } from '../../../constants/defaultValues';

const ListadoProveedores = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = orderOptionsPages.proveedor;

  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [idProveedor, setIdProveedor] = useState(null);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [functionalities, setFunctionalities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades([Funcionalidades.Actualizar_Proveedor]),
    });
  }, []);

  const { proveedores, loading, error } = useSelector(
    ({ proveedoresApp }) => ({
      proveedores: proveedoresApp.proveedores,
      loading: proveedoresApp.loading,
      error: proveedoresApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      getProveedores({
        currentPage,
        selectedPageSize,
        selectedOrderOption,
        search,
      })
    );
  }, [dispatch, currentPage, selectedPageSize, selectedOrderOption, search]);

  useEffect(() => {
    if (loading && proveedores.errorMsg) {
      NotificationManager.error(
        messages['error.titulo-proveedor-error'],
        messages[proveedores.errorMsg],
        5000,
        null,
        null,
        'filled'
      );
      proveedores.errorMsg = '';
    }
  }, [loading, proveedores, messages]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);
    setIdProveedor(idItem);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  if (error) return <Redirect to="/unauthorized" />;

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(1);
  };

  return !loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading="menu.listado-proveedores"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        changeOrderBy={(id) => {
          setSelectedOrderOption(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={proveedores.totalItem}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={limpiarBusqueda}
        search={proveedores.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={() => setModalOpen(!modalOpen)}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Ingresar_Proveedor,
        ])}
      />
      <AddNewProvider
        modalOpen={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}
        idProveedor={idProveedor}
        setIdProveedor={setIdProveedor}
      />
      <AgrupadorVistasPaginas
        items={proveedores.data}
        displayMode={displayMode}
        currentPage={currentPage}
        totalPage={proveedores.totalPage}
        onChangePage={setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoProveedores);
