import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  demo1 = new BehaviorSubject(null);
  demo2 = this.demo1.asObservable();

  menu1 = new BehaviorSubject<boolean>(false);
  menu2 = this.menu1.asObservable();

  constructor() { }
}
