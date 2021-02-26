import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit, OnDestroy {
  usuariosSubscription: Subscription;
  usuarios: Usuario[];
  loading: boolean = false;
  error: any;

  //En lugar d eservicios en comunicacion con la API vamos a utilizar Efectos, esto haace que nuestar app sea mas facil de mantener y programar
  constructor(
    //private usuarioService: UsuarioService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    /*
    this.usuarioService.getUsers().subscribe( res => this.usuarios = res);
    */

    
    this.usuariosSubscription = this.store.select('usuarios').subscribe( ({ users, loading, error }) => {
      this.usuarios = Object.values(users); //Me esta devolviento un objeto en lugar de un arry de usuarios!! No sé por que!!
      this.loading = loading;
      this.error = error;
    });

    //vamos a disparar nuestra accion
    this.store.dispatch(cargarUsuarios())
    

  }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }

}
