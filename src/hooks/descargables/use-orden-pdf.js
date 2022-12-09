import { useEffect, useState } from 'react';
import descargable from '../../services/descargableService';

const useOrdenPDF = (idOrden) => {
  const [descargaPDF, setDescargaPDF] = useState(false);

  useEffect(() => {
    const downloadPDF = async () => {
      const { data } = await descargable.getOrdenPDF(idOrden);
      const downloadLink = document.createElement('a');
      const fileName = `orden-${idOrden}.pdf`;

      downloadLink.href = data;
      downloadLink.download = fileName;
      downloadLink.click();
      setDescargaPDF(false);
    };

    if (descargaPDF) downloadPDF();
  }, [descargaPDF, idOrden]);

  return { setDescargaPDF };
};

export default useOrdenPDF;
