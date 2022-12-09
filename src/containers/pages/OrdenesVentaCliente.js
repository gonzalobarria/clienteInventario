import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import useOrdenesVentaCliente from '../../hooks/clientes/use-ordenes-venta-cliente';
import usePaginador from '../../hooks/use-paginador';
import Pagination from './Pagination';
import VistaListaInfoOrdenesVenta from './VistaListaInfoOrdenesVenta';

function collect(props) {
  return { data: props.data };
}

const OrdenesVentaCliente = ({ idCliente }) => {
  const { pag } = usePaginador();

  const { ordenesVentaCliente, isLoading } = useOrdenesVentaCliente({
    idCliente,
    ...pag,
  });

  return isLoading ? (
    <div className="loading" />
  ) : (
    <Row>
      <Colxx>
        {ordenesVentaCliente.data.map((item) => (
          <VistaListaInfoOrdenesVenta
            key={item.id}
            item={item}
            collect={collect}
          />
        ))}
      </Colxx>

      <Pagination
        currentPage={pag.currentPage}
        totalPage={ordenesVentaCliente.totalPage}
        onChangePage={pag.setCurrentPage}
      />
    </Row>
  );
};

export default OrdenesVentaCliente;
