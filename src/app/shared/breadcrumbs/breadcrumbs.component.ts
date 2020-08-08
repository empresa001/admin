import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public tituloBreadcrumbs: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router) {
    this.getDataRoute();
    this.tituloSubs$ = this.getDataRoute()
      .subscribe( ({titulo}) => {
        this.tituloBreadcrumbs = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }


  getDataRoute() {
   return this.router.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter(( evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
      );
  }

}
