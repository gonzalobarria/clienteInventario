import useSWR from 'swr';
import { URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import orden from '../../services/ordenService';
import useError from '../use-error';

const useOrdenes = (pag) => {
  const URL = `${URI.ORDENES}${getStrQuery(pag)}`;
  const { data: ordenes, error, mutate } = useSWR(URL);
  const { msgError, msgInfo } = useError(error);

  const isLoading = !ordenes && !error;

  const accion = (payload) => {
    async function fetchData() {
      await orden.actualizaUsuario(payload);
      mutate();
    }

    fetchData();
  };

  const crea = (payload) => {
    async function fetchData() {
      try {
        await orden.crea(payload);
        mutate();

        msgInfo({
          titulo: 'general.felicitaciones',
          mensaje: 'order.crea-exito',
        });
      } catch (err) {
        msgError({
          titulo: 'general.ups',
          mensaje: err.response.data.msg,
        });
      }
    }

    fetchData();
  };

  return { ordenes, isLoading, accion, crea };
};

export default useOrdenes;
