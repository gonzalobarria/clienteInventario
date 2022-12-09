import React from 'react';
import { injectIntl } from 'react-intl';

import AddNewUser from '../../../containers/pages/AddNewUser';
import AgrupadorVistasUsuarios from '../../../containers/pages/AgrupadorVistasUsuarios';
import ListPageHeading from '../../../containers/pages/ListPageHeading';

import { orderOptionsPages, pageSizes } from '../../../constants/defaultValues';

import { Funcionalidades } from '../../../helpers/authHelper';
import { checkFuncionalidades } from '../../../helpers/Utils';

import useFuncionalidades from '../../../hooks/use-funcionalidades';
import useModal from '../../../hooks/use-modal';
import usePaginador from '../../../hooks/use-paginador';
import useUsuarios from '../../../hooks/usuarios/use-usuarios';

const ListadoUsuarios = ({ match }) => {
  const orderOptions = orderOptionsPages.usuario;
  const { pag } = usePaginador(orderOptions);
  const { usuarios, isLoading, accion } = useUsuarios(pag);
  const { modalOpen, toggleModal, editItem, item } = useModal();

  const { functionalities } = useFuncionalidades([
    Funcionalidades.Actualizar_Usuario,
  ]);

  return isLoading ? (
    <div className="loading" />
  ) : (
    <div className="disable-text-selection">
      <ListPageHeading
        heading="menu.listado-usuarios"
        displayMode={pag.displayMode}
        changeDisplayMode={pag.setDisplayMode}
        changeOrderBy={pag.setOrder}
        changePageSize={pag.setPageSize}
        selectedPageSize={pag.pageSize}
        totalItemCount={usuarios.totalItem}
        selectedOrderOption={pag.orderBy}
        match={match}
        startIndex={pag.startIndex}
        endIndex={pag.endIndex}
        onSearchKey={(e) => {
          if (e.key === 'Enter')
            pag.limpiarBusqueda(e.target.value.toLowerCase());
        }}
        limpiarBusqueda={pag.limpiarBusqueda}
        search={usuarios.search}
        orderOptions={orderOptions}
        pageSizes={pageSizes}
        toggleModal={toggleModal}
        showAddNewButton={checkFuncionalidades([
          Funcionalidades.Agregar_Usuario,
        ])}
      />
      <AddNewUser
        modalOpen={modalOpen}
        toggleModal={toggleModal}
        usuario={item}
        accion={accion}
      />
      <AgrupadorVistasUsuarios
        items={usuarios.data}
        displayMode={pag.displayMode}
        currentPage={pag.currentPage}
        totalPage={usuarios.totalPage}
        onChangePage={pag.setCurrentPage}
        editItem={editItem}
        functionalities={functionalities}
      />
    </div>
  );
};

export default injectIntl(ListadoUsuarios);
