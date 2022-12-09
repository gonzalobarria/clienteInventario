import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AgregarNuevoCliente from '../../../containers/pages/AgregarNuevoCliente';
import { getClientes } from '../../../redux/actions';
import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades } from '../../../helpers/Utils';
import AgrupadorVistasClientes from '../../../containers/pages/AgrupadorVistasClientes';
import { NotificationManager } from '../../../components/common/react-notifications';
import { pageSizes } from '../../../constants/defaultValues';

const ListadoClientes = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = [
    { id: 1, label: messages['opciones.nombre-cliente'] },
    { id: 3, label: messages['opciones.estado'] },
  ];

  const [displayMode, setDisplayMode] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [cliente, setCliente] = useState(null);
  const [functionalities, setFunctionalities] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades([Funcionalidades.Actualizar_Cliente]),
    });
  }, []);

  const { clientes, loading, error } = useSelector(
    ({ clientesApp }) => ({
      clientes: clientesApp.clientes,
      loading: clientesApp.loading,
      error: clientesApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      getClientes({
        currentPage,
        selectedPageSize,
        selectedOrderOption,
        search,
      })
    );
  }, [dispatch, currentPage, selectedPageSize, selectedOrderOption, search]);

  useEffect(() => {
    if (loading && clientes?.errorMsg) {
      NotificationManager.error(
        messages['error.titulo-cliente-error'],
        messages[clientes.errorMsg],
        5000,
        null,
        null,
        'filled'
      );
      clientes.errorMsg = '';
    }
  }, [loading, clientes, messages]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);
    setCliente(clientes.data.find((m) => m.id === idItem));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setCliente(null);
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
        heading="menu.listado-clientes"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        changeOrderBy={(id) => {
          setSelectedOrderOption(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={clientes.totalItem}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={limpiarBusqueda}
        search={clientes.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Agregar_Cliente,
        ])}
      />
      <AgregarNuevoCliente
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        cliente={cliente}
      />
      <AgrupadorVistasClientes
        items={clientes.data}
        displayMode={displayMode}
        currentPage={currentPage}
        totalPage={clientes.totalPage}
        onChangePage={setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoClientes);
