import useSWR from 'swr';
import { METODOS_PAGO, URI } from '../../constants/enums';
import { getStrQuery } from '../../helpers/Utils';
import ordenVenta from '../../services/ordenVentaService';
import useError from '../use-error';

const useProductosAlmacenVenta = (params) => {
  let URL = `${URI.ALMACENES}/${params.idAlmacen}/productos/venta${getStrQuery(
    params
  )}`;

  if (params.idCliente)
    URL = `${URI.CLIENTES}/${params.idCliente}/venta/${
      params.idAlmacen
    }${getStrQuery(params)}`;

  const { data: productosAlmacenVenta, error, mutate } = useSWR(
    params.idAlmacen ? URL : null
  );
  const { msgError, msgInfo } = useError(error);

  const isLoading = !productosAlmacenVenta && !error;

  const imprimeTicket = (item) => {
    async function fetchData() {
      const { COTIZACION } = METODOS_PAGO;

      try {
        await ordenVenta.crea(item);

        const mensaje =
          COTIZACION === item.metodoPago
            ? 'pos.cotizacion-creada'
            : 'pos.venta-creada';
        const titulo =
          COTIZACION === item.metodoPago
            ? 'pos.cotizacion-realizada'
            : 'pos.venta-realizada';

        msgInfo({ titulo, mensaje });
      } catch (err) {
        msgError({
          titulo: 'error.titulo-usuario-upd-error',
          mensaje: err.response.data.msg,
        });
      }
      mutate();
    }

    fetchData();
  };

  return { productosAlmacenVenta, isLoading, imprimeTicket };
};

export default useProductosAlmacenVenta;
