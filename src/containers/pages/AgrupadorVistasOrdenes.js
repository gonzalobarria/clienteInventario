import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import VistaListaInfoOrdenes from './VistaListaInfoOrdenes';
import VistaListaMiniaturaOrdenes from './VistaListaMiniaturaOrdenes';

function collect(props) {
  return { data: props.data };
}

const AgrupadorVistasOrdenes = ({
  items,
  displayMode,
  currentPage,
  totalPage,
  onChangePage,
  getFunctionalities,
  editItem,
}) => {
  return (
    <Row>
      {items.map((item) => {
        if (displayMode === 'thumblist') {
          return (
            <VistaListaMiniaturaOrdenes
              key={item.id}
              item={item}
              collect={collect}
              editItem={editItem}
              getFunctionalities={getFunctionalities}
            />
          );
        }
        return (
          <VistaListaInfoOrdenes
            key={item.id}
            item={item}
            collect={collect}
            editItem={editItem}
            getFunctionalities={getFunctionalities}
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

export default React.memo(AgrupadorVistasOrdenes);
