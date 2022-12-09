import useSWR from 'swr';
import { URI } from '../../constants/enums';
import almacen from '../../services/almacenService';
import useError from '../use-error';

const useProductosAlmacen = (idAlmacen) => {
  const URL = idAlmacen ? `${URI.ALMACENES}/${idAlmacen}/productos` : null;
  const { data: productosAlmacen, error, mutate } = useSWR(URL);
  const { msgError, msgInfo } = useError(error);

  const isLoading = !productosAlmacen && !error;

  const agregaProducto = async (payload) => {
    try {
      await almacen.agregaProducto(payload);
      mutate();

      msgInfo({
        titulo: 'general.felicitaciones',
        mensaje: 'almacenes.prod-agregado-exito',
      });
    } catch (err) {
      msgError({
        titulo: 'general.ups',
        mensaje: 'almacenes.prod-agregado-error',
      });
    }
  };

  const actualizaProducto = async (payload) => {
    try {
      productosAlmacen.forEach((c) => {
        const us = c;
        if (c.id === payload.idProducto && c.id_almacen === payload.idAlmacen) {
          us.stock_disponible = payload.stockDisponible;
        }
        return us;
      });

      await almacen.actualizaProducto(payload);

      msgInfo({
        titulo: 'general.felicitaciones',
        mensaje: 'almacenes.prod-actualizado-exito',
      });
    } catch (err) {
      msgError({
        titulo: 'general.ups',
        mensaje: 'almacenes.prod-actualizado-error',
      });
    }
  };

  const eliminaProducto = async (payload) => {
    try {
      await almacen.eliminaProducto(payload);
      mutate();

      msgInfo({
        titulo: 'general.felicitaciones',
        mensaje: 'almacenes.prod-eliminado-exito',
      });
    } catch (err) {
      msgError({
        titulo: 'general.ups',
        mensaje: 'almacenes.prod-eliminado-error',
      });
    }
  };

  return {
    productosAlmacen,
    isLoading,
    agregaProducto,
    actualizaProducto,
    eliminaProducto,
  };
};

export default useProductosAlmacen;
