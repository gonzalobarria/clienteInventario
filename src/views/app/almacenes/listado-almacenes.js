import React from 'react';
import { injectIntl } from 'react-intl';
import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AgregarNuevoAlmacen from '../../../containers/pages/AgregarNuevoAlmacen';
import { checkFuncionalidades } from '../../../helpers/Utils';
import { Funcionalidades } from '../../../helpers/authHelper';
import AgrupadorVistasPaginasV2 from '../../../containers/pages/AgrupadorVistasPaginasV2';
import { TIPOS_ALMACEN } from '../../../constants/enums';
import { orderOptionsPages, pageSizes } from '../../../constants/defaultValues';
import useAlmacenes from '../../../hooks/almacenes/use-almacenes';
import usePaginador from '../../../hooks/use-paginador';
import useModal from '../../../hooks/use-modal';
import useFuncionalidades from '../../../hooks/use-funcionalidades';

const ListadoAlmacenes = ({ match, esBodega }) => {
  const { bodega, local } = orderOptionsPages;
  const { BODEGA, LOCAL } = TIPOS_ALMACEN;

  const orderOptions = esBodega ? bodega : local;
  const idTipoAlmacen = esBodega ? BODEGA : LOCAL;

  const { pag } = usePaginador(orderOptions);
  const { almacenes, isLoading, accion } = useAlmacenes({
    idTipoAlmacen,
    ...pag,
  });
  const { modalOpen, toggleModal, editItem, item } = useModal();

  const { functionalities } = useFuncionalidades([
    Funcionalidades.Actualizar_Almacen,
  ]);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading={esBodega ? 'menu.listado-bodegas' : 'menu.listado-locales'}
        displayMode={pag.displayMode}
        changeDisplayMode={pag.setDisplayMode}
        changeOrderBy={pag.setOrder}
        changePageSize={pag.setPageSize}
        selectedPageSize={pag.pageSize}
        totalItemCount={almacenes.totalItem}
        selectedOrderOption={pag.orderBy}
        match={match}
        startIndex={pag.startIndex}
        endIndex={pag.endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter')
            pag.limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={pag.limpiarBusqueda}
        search={almacenes.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Ingresar_Almacen,
        ])}
      />
      <AgregarNuevoAlmacen
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        idTipoAlmacen={idTipoAlmacen}
        almacen={item}
        accion={accion}
      />
      <AgrupadorVistasPaginasV2
        items={almacenes.data}
        displayMode={pag.displayMode}
        currentPage={pag.currentPage}
        totalPage={almacenes.totalPage}
        onChangePage={pag.setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoAlmacenes);
