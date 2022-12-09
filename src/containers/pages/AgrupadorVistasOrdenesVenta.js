import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import VistaListaInfoOrdenesVenta from './VistaListaInfoOrdenesVenta';

function collect(props) {
  return { data: props.data };
}

const AgrupadorVistasOrdenesVenta = ({
  items,
  currentPage,
  totalPage,
  onChangePage,
}) => {
  return (
    <Row>
      {items.map((item) => (
        <VistaListaInfoOrdenesVenta
          key={item.id}
          item={item}
          collect={collect}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(AgrupadorVistasOrdenesVenta);
