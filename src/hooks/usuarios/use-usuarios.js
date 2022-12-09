import useSWR from 'swr';
import { URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import usuario from '../../services/usuarioService';
import useError from '../use-error';

const useUsuarios = (params) => {
  const URL = `${URI.USUARIOS}${getStrQuery(params)}`;
  const { data: usuarios, error, mutate } = useSWR(URL);
  const { msgError } = useError(error);

  const isLoading = !usuarios && !error;

  const accion = (payload) => {
    async function fetchData() {
      switch (payload.action) {
        case 'add':
          try {
            await usuario.crea(payload);

            params.setCurrentPage(1);
            mutate();
          } catch (err) {
            msgError({
              titulo: 'error.titulo-usuario-error',
              mensaje: err.response.data.msg,
            });
          }
          break;

        case 'update':
          usuarios.data = usuarios.data.map((c) => {
            const us = c;
            if (c.id === payload.idUsuario) {
              us.nombre = payload.nombre;
              us.ap_paterno = payload.apPaterno;
              us.email = payload.email;
              us.id_estado = payload.idEstado;
            }
            return us;
          });

          try {
            await usuario.actualiza(payload);
          } catch (err) {
            msgError({
              titulo: 'error.titulo-usuario-upd-error',
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

  return { usuarios, isLoading, accion };
};

export default useUsuarios;
