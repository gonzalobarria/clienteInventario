import { useEffect, useState } from 'react';
import { checkFuncionalidades } from '../helpers/Utils';

const useFuncionalidades = (funcionalidades) => {
  const [functionalities, setFunctionalities] = useState({});

  useEffect(() => {
    setFunctionalities({
      canEdit: checkFuncionalidades(funcionalidades),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { functionalities };
};

export default useFuncionalidades;
