import { adminRoot } from './defaultValues';
import { Funcionalidades } from '../helpers/authHelper';

const data = [
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
  },
  {
    id: 'pos',
    icon: 'iconsminds-cash-register-2',
    label: 'menu.pos',
    to: `${adminRoot}/pos`,
    funcionalidades: [Funcionalidades.Agregar_Orden_Venta],
  },
  {
    id: 'clientes',
    icon: 'iconsminds-user',
    label: 'menu.clientes',
    to: `${adminRoot}/clientes`,
    funcionalidades: [Funcionalidades.Control_Total_del_Negocio],
  },
  {
    id: 'productos',
    icon: 'iconsminds-shopping-basket',
    label: 'menu.productos',
    to: `${adminRoot}/productos`,
    funcionalidades: [Funcionalidades.Ver_Producto],
  },
  {
    id: 'bodegas',
    icon: 'iconsminds-shop',
    label: 'menu.bodegas',
    to: `${adminRoot}/almacenes/bodegas`,
    funcionalidades: [Funcionalidades.Ver_Almacen],
  },
  {
    id: 'locales',
    icon: 'iconsminds-shop',
    label: 'menu.locales',
    to: `${adminRoot}/almacenes/locales`,
    funcionalidades: [Funcionalidades.Ver_Almacen],
  },
  {
    id: 'ordenes',
    icon: 'iconsminds-receipt-4',
    label: 'menu.ordenes',
    to: `${adminRoot}/ordenes`,
    funcionalidades: [Funcionalidades.Ver_Orden],
  },
  {
    id: 'ordenesVenta',
    icon: 'iconsminds-receipt-4',
    label: 'menu.ordenes-venta',
    to: `${adminRoot}/ordenes-venta`,
    funcionalidades: [Funcionalidades.Ver_Orden_Venta],
  },
  {
    id: 'mantenedores',
    icon: 'iconsminds-gear',
    label: 'menu.mantenedores',
    to: `${adminRoot}/mantenedores`,
    funcionalidades: [
      Funcionalidades.Control_Total_de_la_Plataforma,
      Funcionalidades.Control_Total_del_Negocio,
    ],
    subs: [
      {
        icon: 'simple-icon-basket-loaded',
        label: 'menu.proveedores',
        to: `${adminRoot}/mantenedores/proveedores`,
      },
      {
        icon: 'simple-icon-frame',
        label: 'menu.marcas',
        to: `${adminRoot}/mantenedores/marcas`,
      },
      {
        icon: 'simple-icon-frame',
        label: 'menu.categorias',
        to: `${adminRoot}/mantenedores/categorias`,
      },
      {
        icon: 'simple-icon-frame',
        label: 'menu.usuarios',
        to: `${adminRoot}/mantenedores/usuarios`,
      },
    ],
  },
];
export default data;
