import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { comboConvert } from '../../helpers/Utils';
import useCategoriasProductosAlmacen from '../../hooks/almacenes/use-categorias-productos-almacen';

const FormikCategoriesPOS = ({ setCategoria, setCurrentPage, idAlmacen }) => {
  const [selected, setSelected] = useState('todas');

  const { categorias, isLoading: isLoadingPA } = useCategoriasProductosAlmacen(
    idAlmacen
  );

  let catArr = [{ value: 'todas', label: 'Todas' }];

  if (!isLoadingPA)
    catArr = catArr.concat(
      categorias
        .filter((c) => c.activo && !c.id_categoria_padre)
        .map(comboConvert)
    );

  const setCat = (event) => {
    const cat = event.target.value;

    setSelected(cat);
    setCategoria(cat);
    setCurrentPage(1);
  };

  return (
    <div>
      {!isLoadingPA &&
        catArr.map((cat) => (
          <p key={cat.value} className="d-sm-inline-block mb-2 btn-right">
            <Button
              color="secondary"
              outline={selected !== cat.value}
              size="xs"
              value={cat.value}
              onClick={setCat}
            >
              {cat.label}
            </Button>
          </p>
        ))}
    </div>
  );
};
export default FormikCategoriesPOS;
