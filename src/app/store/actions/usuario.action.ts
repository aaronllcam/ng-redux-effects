import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuario = createAction(
    '[Usuarios] Cargar usuario',
    props<{ id: string }>()    
);

export const cargarUsuarioSuccess = createAction(
    '[Usuarios] cargarUsuarioSuccess',
    props<{ usuario: Usuario }>()    
);

export const cargarUsuarioError = createAction(
    '[Usuarios] cargarUsuarioError',
    props<{ payload: any }>()    
);