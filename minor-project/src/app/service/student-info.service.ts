import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentInfoService {
 getsend=new Subject<any>();
  constructor() { }
  receiveInfo(name,cls)
  {
     console.log(name,cls);
  }

 
}
