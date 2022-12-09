import React, { useState, useEffect } from 'react';
import momentTz from 'moment-timezone';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';

import ListPageHeadingOV from '../../../containers/pages/ListPageHeadingOV';
import { getOrdenesVenta } from '../../../redux/actions';
import { NotificationManager } from '../../../components/common/react-notifications';
import {
  defCurrentPage,
  pageSizes,
  TIMEZONE,
} from '../../../constants/defaultValues';
import AgrupadorVistasOrdenesVenta from '../../../containers/pages/AgrupadorVistasOrdenesVenta';

const ListadoOrdenesVenta = ({ match, intl }) => {
  const { messages } = intl;
  const orderOptions = [
    { id: 1, label: messages['opciones.nombre-orden-venta'] },
    { id: 3, label: messages['opciones.estado'] },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState(
    orderOptions[0]
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [idOrdenVenta, setIdOrdenVenta] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [startDateRange, setStartDateRange] = useState(null);
  const [endDateRange, setEndDateRange] = useState(null);

  const dispatch = useDispatch();

  const { ordenesVenta, loading, error } = useSelector(
    ({ ordenesVentaApp }) => ({
      ordenesVenta: ordenesVentaApp.ordenesVenta,
      loading: ordenesVentaApp.loading,
      error: ordenesVentaApp.error,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(
      getOrdenesVenta({
        currentPage,
        selectedPageSize,
        selectedOrderOption,
        search,
        idOrdenVenta,
        fechaDesde,
        fechaHasta,
      })
    );
  }, [
    dispatch,
    currentPage,
    selectedPageSize,
    selectedOrderOption,
    search,
    idOrdenVenta,
    fechaDesde,
    fechaHasta,
  ]);

  useEffect(() => {
    if (startDateRange && endDateRange) {
      setFechaDesde(momentTz(startDateRange).tz(TIMEZONE).format());
      setFechaHasta(momentTz(endDateRange).tz(TIMEZONE).format());
      setCurrentPage(defCurrentPage);
    }
  }, [startDateRange, endDateRange]);

  if (error && error.response.data.msg) {
    NotificationManager.error(
      '',
      messages[error.response.data.msg],
      3000,
      null,
      null,
      'filled'
    );
  }

  const limpiarBusqueda = () => {
    setSearch('');
    setIdOrdenVenta('');
    setFechaDesde(null);
    setFechaHasta(null);
    setStartDateRange(null);
    setEndDateRange(null);
    setCurrentPage(defCurrentPage);
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !loading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeadingOV
        heading="menu.listado-ordenes-venta"
        changeOrderBy={(id) => {
          setSelectedOrderOption(orderOptions.find((x) => x.id === id));
        }}
        changePageSize={setSelectedPageSize}
        selectedPageSize={selectedPageSize}
        totalItemCount={ordenesVenta.totalItem}
        selectedOrderOption={selectedOrderOption}
        match={match}
        startIndex={startIndex}
        endIndex={endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter') {
            setIdOrdenVenta(e.target.value.toLowerCase());
            setCurrentPage(defCurrentPage);
          }
        }}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={() => setModalOpen(!modalOpen)}
        showOrderBy={false}
        showSearch
        search={ordenesVenta.search}
        limpiarBusqueda={limpiarBusqueda}
        startDateRange={startDateRange}
        endDateRange={endDateRange}
        setStartDateRange={setStartDateRange}
        setEndDateRange={setEndDateRange}
      />
      <AgrupadorVistasOrdenesVenta
        items={ordenesVenta.data}
        currentPage={currentPage}
        totalPage={ordenesVenta.totalPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};

export default injectIntl(ListadoOrdenesVenta);
