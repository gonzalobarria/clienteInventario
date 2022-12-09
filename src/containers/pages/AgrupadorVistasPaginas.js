import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import VistaListaInfo from './VistaListaInfo';
import VistaListaMiniatura from './VistaListaMiniatura';

function collect(props) {
  return { data: props.data };
}

const AgrupadorVistasPaginas = ({
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
          <VistaListaInfo
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

export default React.memo(AgrupadorVistasPaginas);
