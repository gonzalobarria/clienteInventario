import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from '../components/common/react-notifications';

const useError = (error) => {
  const history = useHistory();
  const intl = useIntl();

  useEffect(() => {
    if (error) history.push('/unauthorized');
  }, [error, history]);

  const checkMsg = (msg) =>
    msg.indexOf('.') !== -1 ? intl.formatMessage({ id: msg }) : msg;

  const msgError = ({ mensaje, titulo }) =>
    NotificationManager.error(
      checkMsg(mensaje),
      checkMsg(titulo),
      5000,
      null,
      null,
      'filled'
    );

  const msgInfo = ({ mensaje, titulo }) =>
    NotificationManager.info(
      checkMsg(mensaje),
      checkMsg(titulo),
      5000,
      null,
      null,
      'filled'
    );

  return { msgError, msgInfo };
};

export default useError;
