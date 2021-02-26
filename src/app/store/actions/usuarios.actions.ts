import { createAction, props } from '@ngrx/store';

export const cargarUsuarios = createAction('[Usuarios] Cargar usuarios');

export const cargarUsuariosSuccess = createAction(
    '[Usuarios] cargarUsuariosSuccess',
    props<{ usuarios: [] }>()    
);

export const cargarUsuariosError = createAction(
    '[Usuarios] cargarUsuariosError',
    props<{ payload: any }>()    
);