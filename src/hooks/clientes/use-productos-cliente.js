import useSWR from 'swr';
import { URI } from '../../constants/enums';
import cliente from '../../services/clienteService';
import useError from '../use-error';

const useProductosCliente = (idCliente) => {
  const URL = idCliente ? `${URI.CLIENTES}/${idCliente}/productos` : null;
  const { data: productosCliente, error, mutate } = useSWR(URL);
  const { msgError, msgInfo } = useError(error);

  const isLoading = !productosCliente && !error;

  const actualizaProducto = async (payload) => {
    await cliente.actualizaProducto(payload);
    mutate();
  };

  const eliminaProducto = async (payload) => {
    await cliente.eliminaProducto(payload);
    mutate();
  };

  const agregaProducto = async (payload) => {
    await cliente.agregaProducto(payload);
    mutate();
  };

  const creaAsignaProducto = async (payload) => {
    try {
      await cliente.creaAsignaProducto(payload);
      mutate();

      msgInfo({
        titulo: 'general.felicitaciones',
        mensaje: 'cliente.producto-crea-asigna-exito',
      });
    } catch (err) {
      msgError({
        titulo: 'error.item-repetido',
        mensaje: err.response.data.msg,
      });
    }
  };

  return {
    productosCliente,
    isLoading,
    mutate,
    actualizaProducto,
    eliminaProducto,
    agregaProducto,
    creaAsignaProducto,
  };
};

export default useProductosCliente;
