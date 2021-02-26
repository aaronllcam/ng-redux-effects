import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;
  storeSubscription : Subscription; 
  user      : Usuario;
  isLoading : boolean = false;
  isLoaded  : boolean = false;
  error     : any 
  userId    : string  = null;

  constructor(  private router: ActivatedRoute,
                private store : Store<AppState> ) { }

  ngOnInit(): void {

    this.storeSubscription = this.store.select('usuario').subscribe( ({ user, loading, loaded, error }) => {
      this.user       = user;
      this.isLoading  = loading;
      this.isLoaded   = loaded;
      this.error      = error;
    });

    this.routerSubscription = this.router.params.subscribe( 
      ({ id }) => this.store.dispatch(cargarUsuario( {id} ))
    );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
