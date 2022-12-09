/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import { ThemeColors } from '../../helpers/ThemeColors';
import { getArrayOfDays } from '../../helpers/Utils';

import {
  ORDENES_VENTA_GET_LIST,
  ORDENES_VENTA_GET_LIST_SUCCESS,
  ORDENES_VENTA_GET_LIST_ERROR,
  ORDENES_VENTA_ADD_ITEM,
  ORDENES_VENTA_ADD_ITEM_SUCCESS,
  ORDENES_VENTA_ADD_ITEM_ERROR,
  ORDENES_VENTA_PRODUCTO_GET_LIST,
  ORDENES_VENTA_PRODUCTO_GET_LIST_SUCCESS,
  ORDENES_VENTA_PRODUCTO_GET_LIST_ERROR,
  ORDENES_VENTA_ALMACEN_GET_LIST,
  ORDENES_VENTA_ALMACEN_GET_LIST_SUCCESS,
  ORDENES_VENTA_ALMACEN_GET_LIST_ERROR,
  ORDENES_VENTA_PROVEEDOR_GET_LIST,
  ORDENES_VENTA_PROVEEDOR_GET_LIST_SUCCESS,
  ORDENES_VENTA_PROVEEDOR_GET_LIST_ERROR,
  ORDENES_VENTA_MARCA_GET_LIST,
  ORDENES_VENTA_MARCA_GET_LIST_SUCCESS,
  ORDENES_VENTA_MARCA_GET_LIST_ERROR,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM_SUCCESS,
  ORDENES_VENTA_RECEPTOR_UPD_ITEM_ERROR,
  ORDENES_VENTA_SEMANA_GET_LIST,
  ORDENES_VENTA_SEMANA_GET_LIST_SUCCESS,
  ORDENES_VENTA_SEMANA_GET_LIST_ERROR,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST_SUCCESS,
  ORDENES_VENTA_SEMANA_MONTO_GET_LIST_ERROR,
} from '../actions';

const colors = ThemeColors();

const INIT_STATE = {
  ordenesVenta: null,
  ordenesProducto: null,
  ordenesAlmacen: null,
  ordenesProveedor: null,
  ordenesMarca: null,
  ordenesVentaSemana: null,
  ordenesVentaSemanaMonto: null,
  ventasSemana: null,
  ventasSemanaMonto: null,
  error: '',
  errorOVSM: '',
  loading: false,
  loadingOP: false,
  loadingOA: false,
  loadingOPr: false,
  loadingOM: false,
  loadingOVS: false,
  loadingOVSM: false,
};

let misDatos = [];
let daysMS = [];
let datos = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ORDENES_VENTA_GET_LIST:
      return { ...state, loading: false };

    case ORDENES_VENTA_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        ordenesVenta: action.payload,
      };

    case ORDENES_VENTA_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDENES_VENTA_ADD_ITEM:
      return { ...state, loading: false, error: null };

    case ORDENES_VENTA_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        ordenesVenta: action.payload,
      };

    case ORDENES_VENTA_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDENES_VENTA_PRODUCTO_GET_LIST:
      return { ...state, loadingOP: false };

    case ORDENES_VENTA_PRODUCTO_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOP: true,
        ordenesProducto: action.payload,
      };

    case ORDENES_VENTA_PRODUCTO_GET_LIST_ERROR:
      return { ...state, loadingOP: true, error: action.payload };

    case ORDENES_VENTA_ALMACEN_GET_LIST:
      return { ...state, loadingOA: false };

    case ORDENES_VENTA_ALMACEN_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOA: true,
        ordenesAlmacen: action.payload,
      };

    case ORDENES_VENTA_ALMACEN_GET_LIST_ERROR:
      return { ...state, loadingOA: true, error: action.payload };

    case ORDENES_VENTA_PROVEEDOR_GET_LIST:
      return { ...state, loadingOPr: false };

    case ORDENES_VENTA_PROVEEDOR_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOPr: true,
        ordenesProveedor: action.payload,
      };

    case ORDENES_VENTA_PROVEEDOR_GET_LIST_ERROR:
      return { ...state, loadingOPr: true, error: action.payload };

    case ORDENES_VENTA_MARCA_GET_LIST:
      return { ...state, loadingOM: false };

    case ORDENES_VENTA_MARCA_GET_LIST_SUCCESS:
      return {
        ...state,
        loadingOM: true,
        ordenesMarca: action.payload,
      };

    case ORDENES_VENTA_MARCA_GET_LIST_ERROR:
      return { ...state, loadingOM: true, error: action.payload };

    case ORDENES_VENTA_RECEPTOR_UPD_ITEM:
      return { ...state, loading: false };

    case ORDENES_VENTA_RECEPTOR_UPD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        ordenesVenta: action.payload,
      };

    case ORDENES_VENTA_RECEPTOR_UPD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    case ORDENES_VENTA_SEMANA_GET_LIST:
      return { ...state, loadingOVS: false };

    case ORDENES_VENTA_SEMANA_GET_LIST_SUCCESS:
      misDatos = [];
      daysMS = getArrayOfDays(true);

      daysMS.forEach((d) => {
        const ov = action.payload.find((md) => md.dia === d);
        misDatos.push(parseInt(ov?.total_ordenes, 10) || 0);
      });

      datos = {
        labels: getArrayOfDays(),
        min: Math.min(...misDatos),
        max: Math.max(...misDatos),
        datasets: [
          {
            label: '',
            data: misDatos,
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false,
          },
        ],
      };
      return {
        ...state,
        loadingOVS: true,
        ordenesVentaSemana: action.payload,
        ventasSemana: datos,
      };

    case ORDENES_VENTA_SEMANA_GET_LIST_ERROR:
      return { ...state, loadingOVS: true, error: action.payload };

    case ORDENES_VENTA_SEMANA_MONTO_GET_LIST:
      return { ...state, loadingOVSM: false };

    case ORDENES_VENTA_SEMANA_MONTO_GET_LIST_SUCCESS:
      misDatos = [];
      daysMS = getArrayOfDays(true);
      const gruposAlmacenes = [];

      action.payload.forEach((ovmDia) => {
        const almacen = gruposAlmacenes.find(
          (va) => va.idAlmacen === ovmDia.id_almacen
        );

        if (almacen) {
          almacen.datos.push({
            dia: ovmDia.dia,
            monto_diario: ovmDia.monto_diario,
          });
        } else {
          gruposAlmacenes.push({
            idAlmacen: ovmDia.id_almacen,
            datos: [{ dia: ovmDia.dia, monto_diario: ovmDia.monto_diario }],
          });
        }
      });

      gruposAlmacenes.forEach((ga) => {
        misDatos = [];

        daysMS.forEach((d) => {
          const ov = ga.datos.find((md) => md.dia === d);
          misDatos.push(parseInt(ov?.monto_diario, 10) || 0);
        });

        datos = {
          labels: getArrayOfDays(),
          datasets: [
            {
              label: 'Ordenes del Día:',
              borderColor: colors.themeColor1,
              pointBorderColor: colors.themeColor1,
              pointHoverBackgroundColor: colors.themeColor1,
              pointHoverBorderColor: colors.themeColor1,
              pointRadius: 2,
              pointBorderWidth: 3,
              pointHoverRadius: 2,
              fill: false,
              borderWidth: 2,
              data: misDatos,
              datalabels: {
                align: 'end',
                anchor: 'end',
              },
            },
          ],
        };

        ga.datosGrafico = datos;
      });

      return {
        ...state,
        loadingOVSM: true,
        ordenesVentaSemanaMonto: action.payload,
        ventasSemanaMonto: gruposAlmacenes,
      };

    case ORDENES_VENTA_SEMANA_MONTO_GET_LIST_ERROR:
      return { ...state, loadingOVSM: true, errorOVSM: action.payload };

    default:
      return { ...state };
  }
};
