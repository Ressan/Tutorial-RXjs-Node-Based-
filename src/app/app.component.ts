import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';
import { Observable, interval, Subscription, of, from, Subscriber } from 'rxjs';
import { map, tap, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy
{
  private subscription: Subscription = new Subscription();
  ngOnInit() {
    function multiplier(item: number): number{
      return 2 * item;
    }
  
    from([1, 0, 12,0, undefined, 13,0,14,15]).pipe(
      // tap(elem => console.log(elem)),
      // map((elem : number) =>{
      //   if (elem == 0)
      //   {
      //     throw new Error('Erreur 0')
      //   }
      //   return elem * 2;
      // }),
      // map(item => item - 2),
      // take(2)
      filter(elem => elem != undefined && elem != 0)
     ).subscribe(
        (item: number | undefined) => console.log(`ma valeur ${item}`),
        (err: unknown) => console.error(err),
        () => console.log('Fin from !')
      )
  }

  public start(): void {
    this.subscription.add(interval(1000).subscribe(
      (value) => console.log('ma valeur', value),
      (error) => console.error(error),
      () => console.log('terminé')
    ));

    this.subscription.add(interval(1000).subscribe(
      (value) => console.warn(' == ma valeur==: ', value),
      (error) => console.error(error),
      () => console.log(' == terminé ==')
    ));

  }

  public stop(): void {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
