/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const APP = '/api/app';
export const defaultMenuType = 'menu-sub-hidden';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const pageSizes = [4, 8, 12, 20];
export const defCurrentPage = 1;
export const defPageSize = 8;
export const defPageSizeTP = 20;
export const defDisplayMode = 'list';
export const TIMEZONE = 'America/Santiago';

export const defaultLocale = 'es';
export const localeOptions = [{ id: 'es', name: 'Español', direction: 'ltr' }];

export const adminRoot = '/app';

export const themeColorStorageKey = '__theme_selected_color';
export const defaultColor = 'light.inventario';
export const darkDefaultColor = 'dark.inventario';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const colors = ['inventario'];

export const orderOptionsPages = {
  proveedor: [
    { id: 1, label: 'opciones.nombre-proveedor' },
    { id: 3, label: 'opciones.estado' },
  ],
  usuario: [
    { id: 1, label: 'opciones.nombre-usuario' },
    { id: 3, label: 'opciones.estado' },
  ],
  orden: [
    { id: 1, label: 'opciones.nombre-orden' },
    { id: 3, label: 'opciones.estado' },
  ],
  bodega: [
    { id: 1, label: 'opciones.nombre-bodega' },
    { id: 3, label: 'opciones.estado' },
  ],
  local: [
    { id: 1, label: 'opciones.nombre-local' },
    { id: 3, label: 'opciones.estado' },
  ],
};
