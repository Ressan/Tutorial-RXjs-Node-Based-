import { Component, OnInit, OnDestroy, VERSION } from '@angular/core';
import { Observable, interval, Subscription, of, from, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy
{
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    const observer = {
      next: (item: unknown) => console.log(`Une boîte arrive ${item}`),
      error: (err: unknown) => console.log(`Oups, erreur : ${err}`),
      complete: () => console.log('Fin de stream!'),
    };

    const stream = new Observable((myObserver) => {
      myObserver.next('Boite 1');
      myObserver.error(new Error());
      myObserver.next('Boite 2');
      myObserver.next('Boite 3');
      // for(let index = 0; index < 100; index ++)
      // {
      //   myObserver.next('Boite');
      // }
      myObserver.complete();
      myObserver.next('Boite 3');
    });

    //stream.subscribe(observer);
    /* Depracted method : */
    const subscription = stream.subscribe(
      (item) => console.log(`Une boîte arrive ${item}`),
      (err) => console.log(`Oups, erreur ${err}`),
      () => console.log('Fin de stream!')
    );

    subscription.unsubscribe();

    // from([12,13,14,15]).subscribe(
      //   (item: number) => console.log(`ma valeur ${item}`),
      //   (err: unknown) => console.error(err),
      //   () => console.log('Fin from !')
      // )
      
      const double = (source: Observable<number>) => new Observable<number>((subscriber) => {
        const subscription = source.subscribe({
          next: (value) => subscriber.next(2 * value),
          error: (err) => subscriber.error(err),
          complete : () => subscriber.complete()
        })

        return () => {
          subscription.unsubscribe();
        }
      })
      
      of(1,2,3,4).pipe(
        double,
        double
      ).subscribe(console.log); 
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
