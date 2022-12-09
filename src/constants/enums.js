import { APP } from './defaultValues';

export const ESTADOS_ORDEN = {
  EN_PROCESO: 1,
  ENVIADO: 2,
  ELIMINADO: 3,
  RECIBIDO: 4,
  PREORDEN_GENERADA: 5,
};

export const ESTADOS_PROVEEDOR = {
  ACTIVO: 1,
  PRUEBAS: 2,
  DESACTIVADO: 3,
};

export const ESTADOS_BOOLEAN = {
  ACTIVO: true,
  INACTIVO: false,
};

export const ESTADOS_USUARIO = {
  ACTIVO: 1,
  BLOQUEDADO: 2,
  ELIMINADO: 3,
};

export const ESTADOS_ALMACEN = {
  HABILITADO: 1,
  MANTENCION: 2,
  ELIMINADO: 3,
};

export const METODOS_PAGO = {
  SIN_SELECCION: 0,
  EFECTIVO: 1,
  TARJETA: 2,
  COTIZACION: 3,
  TRANSFERENCIA: 4,
};

export const ESTADOS_ORDEN_VENTA = {
  FINALIZADO: 1,
  CANCELADO: 2,
  PENDIENTE: 3,
};

export const TIPOS_ALMACEN = {
  BODEGA: 1,
  LOCAL: 2,
};

export const TIPOS_VENTA = {
  DETALLE: 1,
  EMBALAJE: 2,
};

export const TIPOS_VENTA_OV = {
  VENTA: 1,
  COTIZACION: 2,
  GUIA_DE_DESPACHO: 3,
};

export const URI = {
  ALMACENES: `${APP}/almacenes`,
  CATEGORIAS: `${APP}/categorias`,
  CLIENTES: `${APP}/clientes`,
  DESCARGABLES: `${APP}/descargables`,
  MARCAS: `${APP}/marcas`,
  ORDENES: `${APP}/ordenes`,
  ORDENES_VENTA: `${APP}/ordenes_venta`,
  PRODUCTOS: `${APP}/productos`,
  PROVEEDORES: `${APP}/proveedores`,
  UNIDADES_MEDIDA: `${APP}/unidades-medida`,
  USUARIOS: `${APP}/usuarios`,
};
