import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import VistaListaInfoV2 from './VistaListaInfoV2';
import VistaListaMiniatura from './VistaListaMiniatura';

function collect(props) {
  return { data: props.data };
}

const AgrupadorVistasPaginasV2 = ({
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
            <VistaListaMiniatura
              key={item.id}
              item={item}
              collect={collect}
              editItem={editItem}
              functionalities={functionalities}
            />
          );
        }
        return (
          <VistaListaInfoV2
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

export default React.memo(AgrupadorVistasPaginasV2);
