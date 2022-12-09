import { useEffect, useState } from 'react';
import descargable from '../../services/descargableService';

const useProductosPDF = (payload) => {
  const [descargaPDF, setDescargaPDF] = useState(false);

  useEffect(() => {
    const downloadPDF = async () => {
      const { data } = await descargable.getProductosPDF(payload);
      const downloadLink = document.createElement('a');
      const fileName = 'productos.pdf';

      downloadLink.href = data;
      downloadLink.download = fileName;
      downloadLink.click();
      setDescargaPDF(false);
    };

    if (descargaPDF) downloadPDF();
  }, [descargaPDF, payload]);

  return { setDescargaPDF };
};

export default useProductosPDF;
