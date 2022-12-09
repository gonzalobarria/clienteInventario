import useSWR from 'swr';
import useError from '../use-error';
import { URI } from '../../constants/enums';
import almacen from '../../services/almacenService';
import { getStrQuery } from '../../helpers/Utils';

const useAlmacenes = (params) => {
  const URL = `${URI.ALMACENES}${getStrQuery(params)}&idTipoAlmacen=${
    params.idTipoAlmacen
  }`;
  const { data: almacenes, error, mutate } = useSWR(URL);
  const { msgError } = useError(error);

  const isLoading = !almacenes && !error;

  const accion = (payload) => {
    async function fetchData() {
      const { action, esBodega } = payload;

      switch (action) {
        case 'add':
          try {
            await almacen.crea(payload);

            params.setCurrentPage(1);
            mutate();
          } catch (err) {
            msgError({
              titulo: esBodega
                ? 'error.titulo-bodega-error'
                : 'error.titulo-local-error',
              mensaje: err.response.data.msg,
            });
          }
          break;

        case 'update':
          almacenes.data = almacenes.data.map((c) => {
            const us = c;
            if (c.id === payload.idAlmacen) {
              us.glosa = payload.glosa;
              us.descripcion = payload.descripcion;
              us.id_estado = payload.idEstado;
              us.glosa_estado = payload.glosaEstado;
              us.datos_adicionales = us.datos_adicionales ?? {};
              us.datos_adicionales.direccion = payload.direccion;
            }
            return us;
          });

          try {
            await almacen.actualiza(payload);
          } catch (err) {
            msgError({
              titulo: esBodega
                ? 'error.titulo-bodega-upd-error'
                : 'error.titulo-local-upd-error',
              mensaje: err.response.data.msg,
            });
          }
          break;

        default:
          break;
      }
    }

    fetchData();
  };

  return { almacenes, isLoading, accion };
};

export default useAlmacenes;
