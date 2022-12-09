import useSWR from 'swr';
import { URI } from '../../constants/enums';
import proveedorService from '../../services/proveedorService';
import useError from '../use-error';

const useProveedor = (idProveedor) => {
  const URL = idProveedor ? `${URI.PROVEEDORES}/${idProveedor}` : null;
  const { data: proveedor, error, mutate } = useSWR(URL);
  useError(error);

  const isLoading = !proveedor && !error;

  const subirFoto = async (item) => {
    await proveedorService.subirFoto(item);
    mutate();
  };

  return { proveedor, isLoading, subirFoto };
};

export default useProveedor;
