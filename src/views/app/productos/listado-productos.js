import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AgregarNuevoProducto from '../../../containers/pages/AgregarNuevoProducto';
import useProductos from '../../../hooks/productos/use-productos';
import { checkFuncionalidades } from '../../../helpers/Utils';
import { Funcionalidades } from '../../../helpers/authHelper';
import AgrupadorVistasPaginas from '../../../containers/pages/AgrupadorVistasPaginas';
import { NotificationManager } from '../../../components/common/react-notifications';
import {
  defCurrentPage,
  defDisplayMode,
  defPageSize,
  pageSizes,
} from '../../../constants/defaultValues';
import { URI } from '../../../constants/enums';
import { API } from '../../../helpers/axios';

const ListadoProductos = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = [
    { id: 1, label: messages['opciones.nombre-producto'] },
    { id: 3, label: messages['opciones.estado'] },
  ];

  const [displayMode, setDisplayMode] = useState(defDisplayMode);
  const [currentPage, setCurrentPage] = useState(defCurrentPage);
  const [pageSize, setPageSize] = useState(defPageSize);
  const [orderBy, setOrderBy] = useState(orderOptions[0]);
  const [producto, setProducto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [functionalities, setFunctionalities] = useState({});

  const { productos, isLoading, mutate } = useProductos({
    currentPage,
    pageSize,
    orderBy,
    search,
  });

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades([Funcionalidades.Actualizar_Producto]),
    });
  }, []);

  const accion = (item, isInsert = false) => {
    async function fetchData() {
      if (isInsert) {
        await API.post(URI.PRODUCTOS, item);
        setCurrentPage(defCurrentPage);
        mutate();
      } else {
        productos.data = productos.data.map((p) =>
          p.id === item.idProducto
            ? {
                ...p,
                glosa: item.glosa,
                descripcion: item.descripcion,
                activo: item.activo,
              }
            : p
        );
        await API.put(`${URI.PRODUCTOS}/${item.idProducto}`, item);
        mutate();
      }
    }
    fetchData();
    setProducto(null);
  };

  useEffect(() => {
    if (!isLoading && productos.errorMsg) {
      NotificationManager.error(
        messages['error.titulo-producto-error'],
        messages[productos.errorMsg],
        5000,
        null,
        null,
        'filled'
      );
      productos.errorMsg = '';
    }
  }, [isLoading, productos, messages]);

  const editItem = (idItem) => {
    setModalOpen(!modalOpen);

    setProducto(productos.data.find((m) => m.id === idItem));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setProducto(null);
  };

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(defCurrentPage);
  };

  return isLoading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading="menu.listado-productos"
        displayMode={displayMode}
        changeDisplayMode={setDisplayMode}
        changeOrderBy={(id) => {
          setOrderBy(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setPageSize}
        selectedPageSize={pageSize}
        totalItemCount={productos.totalItem}
        selectedOrderOption={orderBy}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={limpiarBusqueda}
        search={productos.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Agregar_Producto,
        ])}
      />
      <AgregarNuevoProducto
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        producto={producto}
        accion={accion}
      />
      <AgrupadorVistasPaginas
        items={productos.data}
        displayMode={displayMode}
        currentPage={currentPage}
        totalPage={productos.totalPage}
        onChangePage={setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoProductos);
