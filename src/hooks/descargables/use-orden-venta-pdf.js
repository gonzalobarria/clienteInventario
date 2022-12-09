import { useEffect, useState } from 'react';
import descargable from '../../services/descargableService';

const useOrdenVentaPDF = (item) => {
  const { id: idOrdenVenta, id_orden_venta: cod } = item;
  const [descargaPDF, setDescargaPDF] = useState(false);

  useEffect(() => {
    const downloadPDF = async () => {
      const { data } = await descargable.getOrdenVentaPDF(idOrdenVenta);
      const downloadLink = document.createElement('a');
      const fileName = `orden-venta-${cod}.pdf`;

      downloadLink.href = data;
      downloadLink.download = fileName;
      downloadLink.click();
      setDescargaPDF(false);
    };

    if (descargaPDF) downloadPDF();
  }, [descargaPDF, idOrdenVenta, cod]);

  return { setDescargaPDF };
};

export default useOrdenVentaPDF;
