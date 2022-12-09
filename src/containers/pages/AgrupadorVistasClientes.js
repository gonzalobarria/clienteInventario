import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import VistaListaMiniatura from './VistaListaMiniatura';
import VistaListaInfoCliente from './VistaListaInfoCliente';

function collect(props) {
  return { data: props.data };
}

const AgrupadorVistasClientes = ({
  items,
  displayMode,
  currentPage,
  totalPage,
  onChangePage,
  editItem,
  functionalities,
}) => {
  return (
    <Row>
      {items.map((item) => {
        if (displayMode === 'thumblist') {
          return (
            <VistaListaMiniatura key={item.id} item={item} collect={collect} />
          );
        }
        return (
          <VistaListaInfoCliente
            key={item.id}
            item={item}
            collect={collect}
            editItem={editItem}
            functionalities={functionalities}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
    </Row>
  );
};

export default React.memo(AgrupadorVistasClientes);
