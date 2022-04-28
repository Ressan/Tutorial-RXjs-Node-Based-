import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
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
  }
}
