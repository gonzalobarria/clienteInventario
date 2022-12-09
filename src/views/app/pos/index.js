/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import { TIPOS_ALMACEN, TIPOS_VENTA } from '../../../constants/enums';
import POSResumenPago from '../../../containers/applications/POSResumenPago';
import POSProductList from '../../../containers/pages/POSProductList';
import useProductosAlmacenVenta from '../../../hooks/almacenes/use-productos-almacen-venta';
import {
  convertToNumber,
  getAlmacenActivo,
  getImagen,
  isAdmin,
} from '../../../helpers/Utils';
import { getAlmacenesActivos } from '../../../redux/actions';
import useProductosVoucher from '../../../hooks/ordenes-venta/use-productos-voucher';
import useError from '../../../hooks/use-error';

const POS = ({ match, location }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [productosOrdenVenta, setProductosOrdenVenta] = useState([]);
  const [category, setCategory] = useState('todas');
  const [buscaBC, setBuscaBC] = useState(false);
  const [totalPagar, setTotalPagar] = useState(0);
  const [search, setSearch] = useState('');
  const almacenesUsuario = getAlmacenActivo();
  const [idAlmacenActivo, setIdAlmacenActivo] = useState(null);
  const [glosaAlmacen, setGlosaAlmacen] = useState('');
  const [idOrdenVenta, setIdOrdenVenta] = useState(
    location?.state?.idOrdenVenta || null
  );

  const {
    params: { idCliente },
  } = match;

  const {
    productosAlmacenVenta,
    isLoading: isLoadingPAV,
    imprimeTicket,
  } = useProductosAlmacenVenta({
    currentPage,
    pageSize,
    search,
    category,
    idAlmacen: idAlmacenActivo,
    idCliente,
  });

  const { productosVoucher, isLoading } = useProductosVoucher(idOrdenVenta);
  const { msgError } = useError();

  const { almacenesActivos } = useSelector(
    ({ tiposAlmacenApp }) => ({
      almacenesActivos: tiposAlmacenApp.almacenesActivos,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getAlmacenesActivos(TIPOS_ALMACEN.LOCAL));
  }, [dispatch]);

  if (isAdmin()) {
    if (almacenesActivos && !idAlmacenActivo) {
      setIdAlmacenActivo(almacenesActivos[0]?.id);
      setGlosaAlmacen(almacenesActivos[0]?.glosa);
    }
  } else if (almacenesUsuario && !idAlmacenActivo) {
    setIdAlmacenActivo(almacenesUsuario[0]?.id_almacen);
    setGlosaAlmacen(almacenesUsuario[0]?.glosa);
  }

  const addItemVoucher = useCallback((producto) => {
    const { id, idAlmacen } = producto;
    const { EMBALAJE, DETALLE } = TIPOS_VENTA;

    let prodOV = productosOrdenVenta.find(
      (p) => p.id === id && p.idAlmacen === idAlmacen
    );
    let prodAdded = false;

    if (!prodOV) {
      const prod = producto;
      const idTipoVenta = prod.id_tipo_venta || DETALLE;

      if (prod?.stock_disponible > 0) {
        prodOV = {
          id: prod.id,
          title: prod.glosa,
          img: getImagen(prod.datos_adicionales?.imgURL),
          price:
            idTipoVenta === DETALLE
              ? prod.precio_detalle
              : prod.precio_embalaje,
          precioDetalle: prod.precio_detalle,
          precioMayor: prod.precio_mayor,
          precioEmbalaje: prod.precio_embalaje,
          unidadesEmbalaje: prod.unidades_embalaje,
          unidadesVenta: prod.unidades_venta,
          totalPagar: prod.cantidad * prod.precio_detalle,
          stock_disponible: prod.stock_disponible,
          idTipoVenta,
          idAlmacen: prod.idAlmacen,
          fakeStock: prod.fake_stock ?? false,
          qty: prod.cantidad,
        };

        const maxProd =
          idTipoVenta === EMBALAJE
            ? Math.floor(
                (prodOV.stock_disponible * prodOV.unidadesVenta) /
                  prodOV.unidadesEmbalaje
              )
            : prodOV.stock_disponible;

        if (maxProd === 0) {
          msgError({
            titulo: 'productos.prod-sin-stock',
            mensaje: 'productos.prod-no-puede-vender',
          });
          return;
        }

        if (maxProd <= prodOV.qty) prodOV.qty = maxProd;

        setProductosOrdenVenta((arr) => [...arr, prodOV]);
        prodAdded = true;
      }
    } else if (prodOV.stock_disponible >= prodOV.qty + 1) {
      prodOV.qty += 1;

      prodAdded = true;
    }

    if (prodAdded) {
      prodOV.totalPagar = prodOV.qty * prodOV.price;
      setTotalPagar((val) => val + prodOV.totalPagar);
    }
  });

  const getCantProdCarro = ({ id, idAlmacen }) => {
    const { DETALLE } = TIPOS_VENTA;
    let cantCarro = 0;

    productosOrdenVenta
      .filter((p) => p.id === id && p.idAlmacen === idAlmacen)
      .forEach((p) => {
        cantCarro +=
          p.idTipoVenta === DETALLE
            ? p.qty
            : (p.qty * p.unidadesEmbalaje) / p.unidadesVenta;
      });

    return cantCarro;
  };

  const getCantProdCarroDetalle = ({ id, idAlmacen }) => {
    const { DETALLE } = TIPOS_VENTA;
    let cantCarro = 0;

    productosOrdenVenta
      .filter((p) => p.id === id && p.idAlmacen === idAlmacen)
      .forEach((p) => {
        cantCarro += p.idTipoVenta === DETALLE ? p.qty : 0;
      });

    return cantCarro;
  };

  const getCantProdCarroEmbalaje = ({ id, idAlmacen }) => {
    const { EMBALAJE } = TIPOS_VENTA;
    let cantCarro = 0;

    productosOrdenVenta
      .filter((p) => p.id === id && p.idAlmacen === idAlmacen)
      .forEach((p) => {
        cantCarro +=
          p.idTipoVenta === EMBALAJE
            ? (p.qty * p.unidadesEmbalaje) / p.unidadesVenta
            : 0;
      });

    return cantCarro;
  };

  const addItem = (producto) => {
    const { id, idAlmacen, idTipoVenta } = producto;
    const { EMBALAJE, DETALLE } = TIPOS_VENTA;

    const prodIdTipoVenta = idTipoVenta ?? DETALLE;

    let prodOV = productosOrdenVenta.find(
      (p) =>
        p.id === id &&
        p.idAlmacen === idAlmacen &&
        p.idTipoVenta === prodIdTipoVenta
    );

    let prodAdded = false;

    if (!prodOV) {
      const prod = productosAlmacenVenta.data.find(
        (p) => p.id === id && p.idAlmacen === idAlmacen
      );

      if (prod.stock_disponible === getCantProdCarro({ id, idAlmacen })) {
        msgError({
          titulo: 'pos.max-alcanzado',
          mensaje: 'pos.no-mas-paquetes',
        });
        return;
      }

      if (prod.stock_disponible > 0) {
        prodOV = {
          id: prod.id,
          title: prod.glosa,
          img: getImagen(prod.datos_adicionales?.imgURL),
          price: prod.precio_detalle,
          precioDetalle: prod.precio_detalle,
          precioMayor: prod.precio_mayor,
          precioEmbalaje: prod.precio_embalaje,
          unidadesEmbalaje: prod.unidades_embalaje,
          unidadesVenta: prod.unidades_venta,
          totalPagar: prod.precio_detalle,
          stock_disponible: prod.stock_disponible,
          idTipoVenta: DETALLE,
          idAlmacen: idAlmacenActivo,
          fakeStock: prod.fake_stock ?? false,
          qty: 1,
        };

        setProductosOrdenVenta((arr) => [...arr, prodOV]);
        prodAdded = true;
      }
    } else {
      const cantActualCarro = getCantProdCarro({ id, idAlmacen });
      const newCant =
        prodOV.idTipoVenta === EMBALAJE
          ? (1 * prodOV.unidadesEmbalaje) / prodOV.unidadesVenta
          : 1;

      if (newCant + cantActualCarro > prodOV.stock_disponible) {
        msgError({
          titulo: 'pos.max-alcanzado',
          mensaje: 'pos.no-mas-paquetes',
        });
        return;
      }

      prodOV.qty += 1;
      prodAdded = true;
    }

    if (!prodAdded) return;

    if (!prodOV.fakeStock) {
      switch (prodOV.idTipoVenta) {
        case DETALLE:
          prodOV.price =
            prodOV.qty * prodOV.unidadesVenta >= prodOV.unidadesEmbalaje
              ? prodOV.precioMayor
              : prodOV.precioDetalle;
          break;
        case EMBALAJE:
          prodOV.price = prodOV.precioEmbalaje;
          break;

        default:
          break;
      }
    }

    prodOV.totalPagar = prodOV.qty * prodOV.price;
    setTotalPagar((totPag) => {
      if (
        !prodOV.fakeStock &&
        prodOV.idTipoVenta === DETALLE &&
        (prodOV.qty * prodOV.unidadesVenta === prodOV.unidadesEmbalaje ||
          (prodOV.qty * prodOV.unidadesVenta > prodOV.unidadesEmbalaje &&
            (prodOV.qty - 1) * prodOV.unidadesVenta < prodOV.unidadesEmbalaje))
      )
        return (
          totPag - (prodOV.qty - 1) * prodOV.precioDetalle + prodOV.totalPagar
        );
      return totPag + convertToNumber(prodOV.price);
    });
  };

  const substractItem = (producto) => {
    const { id, idAlmacen, idTipoVenta } = producto;
    const { EMBALAJE, DETALLE } = TIPOS_VENTA;

    const prodOV = productosOrdenVenta.find(
      (p) =>
        p.id === id &&
        p.idAlmacen === idAlmacen &&
        p.idTipoVenta === idTipoVenta
    );

    if (!prodOV) return;

    if (prodOV.qty <= 1) {
      setProductosOrdenVenta((arr) => [
        ...arr.filter(
          (p) =>
            !(
              p.id === id &&
              p.idAlmacen === idAlmacen &&
              p.idTipoVenta === idTipoVenta
            )
        ),
      ]);

      if (prodOV.qty === 0) return;
    }

    prodOV.qty -= 1;

    if (!prodOV.fakeStock) {
      switch (prodOV.idTipoVenta) {
        case DETALLE:
          prodOV.price =
            prodOV.qty * prodOV.unidadesVenta >= prodOV.unidadesEmbalaje
              ? prodOV.precioMayor
              : prodOV.precioDetalle;
          break;
        case EMBALAJE:
          prodOV.price = prodOV.precioEmbalaje;
          break;

        default:
          break;
      }
    }

    prodOV.totalPagar = prodOV.qty * prodOV.price;
    setTotalPagar((totPag) => {
      if (
        !prodOV.fakeStock &&
        prodOV.idTipoVenta === DETALLE &&
        (prodOV.qty * prodOV.unidadesVenta ===
          prodOV.unidadesEmbalaje - prodOV.unidadesVenta ||
          (prodOV.qty * prodOV.unidadesVenta >
            prodOV.unidadesEmbalaje - prodOV.unidadesVenta &&
            (prodOV.qty - 1) * prodOV.unidadesVenta <
              prodOV.unidadesEmbalaje - prodOV.unidadesVenta))
      )
        return (
          totPag - (prodOV.qty + 1) * prodOV.precioMayor + prodOV.totalPagar
        );

      return totPag - convertToNumber(prodOV.price);
    });
  };

  const changeQty = (producto, qty) => {
    const { id, idAlmacen, idTipoVenta } = producto;
    const { EMBALAJE, DETALLE } = TIPOS_VENTA;

    const prodOV = productosOrdenVenta.find(
      (p) =>
        p.id === id &&
        p.idAlmacen === idAlmacen &&
        p.idTipoVenta === idTipoVenta
    );

    const cantDetalle = getCantProdCarroDetalle({ id, idAlmacen });
    const cantEmbalaje = getCantProdCarroEmbalaje({ id, idAlmacen });
    let newCant =
      prodOV.idTipoVenta === EMBALAJE
        ? (qty * prodOV.unidadesEmbalaje) / prodOV.unidadesVenta
        : qty;

    newCant += prodOV.idTipoVenta === EMBALAJE ? cantDetalle : cantEmbalaje;

    if (newCant > prodOV.stock_disponible) {
      msgError({
        titulo: 'pos.max-alcanzado',
        mensaje: 'pos.no-mas-paquetes',
      });
      return;
    }

    const totalPagarPre = prodOV.qty * prodOV.price;
    prodOV.qty = qty;

    if (!prodOV.fakeStock) {
      switch (prodOV.idTipoVenta) {
        case DETALLE:
          prodOV.price =
            prodOV.qty * prodOV.unidadesVenta >= prodOV.unidadesEmbalaje
              ? prodOV.precioMayor
              : prodOV.precioDetalle;
          break;
        case EMBALAJE:
          prodOV.price = prodOV.precioEmbalaje;
          break;

        default:
          break;
      }
    }

    prodOV.totalPagar = prodOV.qty * prodOV.price;
    setTotalPagar(
      totalPagar + convertToNumber(prodOV.totalPagar - totalPagarPre)
    );
  };

  const changeTipoVenta = (producto, idTipoVenta) => {
    const { id, idAlmacen } = producto;
    const { EMBALAJE, DETALLE } = TIPOS_VENTA;

    const prodOV = productosOrdenVenta.find(
      (p) => p.id === id && p.idAlmacen === idAlmacen
    );

    prodOV.idTipoVenta = idTipoVenta;
    const totalPagarPre = prodOV.qty * prodOV.price;

    const maxProd =
      idTipoVenta === EMBALAJE
        ? Math.floor(
            (prodOV.stock_disponible * prodOV.unidadesVenta) /
              prodOV.unidadesEmbalaje
          )
        : prodOV.stock_disponible;

    if (prodOV.qty > maxProd) prodOV.qty = maxProd;

    switch (prodOV.idTipoVenta) {
      case DETALLE:
        prodOV.price =
          prodOV.qty * prodOV.unidadesVenta >= prodOV.unidadesEmbalaje
            ? prodOV.precioMayor
            : prodOV.precioDetalle;
        break;
      case EMBALAJE:
        prodOV.price = prodOV.precioEmbalaje;
        break;

      default:
        break;
    }

    prodOV.totalPagar = prodOV.qty * prodOV.price;
    setTotalPagar(
      (totPag) => totPag + convertToNumber(prodOV.totalPagar - totalPagarPre)
    );
  };

  useEffect(() => {
    if (idOrdenVenta && !isLoading && !isLoadingPAV) {
      productosVoucher.forEach((item) => {
        addItemVoucher(item);
      });
      setIdOrdenVenta(null);
    }
  }, [idOrdenVenta, isLoading, isLoadingPAV, productosVoucher, addItem]);

  const searchBarcode = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value.toLowerCase());
      setBuscaBC(true);
      e.target.value = '';
    }
  };

  if (buscaBC && productosAlmacenVenta?.data?.length === 1) {
    addItem(productosAlmacenVenta.data[0].id);
    setBuscaBC(false);
  }

  const limpiarBusqueda = (valor = '') => {
    setSearch(valor);
    setCurrentPage(1);
  };

  return (
    <Row className="app-row-pos disable-text-selection">
      <Colxx xxs="12">
        <POSProductList
          match={match}
          productos={productosAlmacenVenta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedPageSize={pageSize}
          setSelectedPageSize={setPageSize}
          addItem={addItem}
          setCategoria={setCategory}
          searchBarcode={searchBarcode}
          almacenes={almacenesActivos}
          idAlmacen={idAlmacenActivo}
          glosaAlmacen={glosaAlmacen}
          setGlosaAlmacen={setGlosaAlmacen}
          setIdAlmacen={setIdAlmacenActivo}
          onSearchKey={(e) => {
            if (e.key === 'Enter')
              limpiarBusqueda(e.target.value.toLowerCase());
          }}
          limpiarBusqueda={limpiarBusqueda}
          search={productosAlmacenVenta?.search}
        />
      </Colxx>
      <POSResumenPago
        productosOrdenVenta={productosOrdenVenta}
        totalPagar={totalPagar}
        idAlmacenActivo={idAlmacenActivo}
        idCliente={idCliente}
        substractItem={substractItem}
        addItem={addItem}
        changeQty={changeQty}
        changeTipoVenta={changeTipoVenta}
        setProductosOrdenVenta={setProductosOrdenVenta}
        setTotalPagar={setTotalPagar}
        imprimeTicket={imprimeTicket}
      />
    </Row>
  );
};

export default injectIntl(POS);
