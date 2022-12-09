import { useEffect, useState } from 'react';
import {
  defCurrentPage,
  defDisplayMode,
  defPageSize,
} from '../constants/defaultValues';

const usePaginador = (orderOptions) => {
  const [displayMode, setDisplayMode] = useState(defDisplayMode);
  const [currentPage, setCurrentPage] = useState(defCurrentPage);
  const [pageSize, setPageSize] = useState(defPageSize);
  const [orderBy, setOrderBy] = useState(orderOptions ? orderOptions[0] : null);
  const [search, setSearch] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(defCurrentPage);
  };

  const setOrder = (id) => setOrderBy(orderOptions.find((x) => x.id === id));

  const pag = {
    displayMode,
    currentPage,
    pageSize,
    orderBy,
    search,
    startIndex,
    endIndex,
    setDisplayMode,
    setCurrentPage,
    setPageSize,
    setOrderBy,
    setSearch,
    limpiarBusqueda,
    setOrder,
  };

  useEffect(() => {
    setStartIndex((currentPage - 1) * pageSize);
    setEndIndex(currentPage * pageSize);
  }, [currentPage, pageSize]);

  return { pag };
};

export default usePaginador;
