import { Component, OnInit } from '@angular/core';
import { StudentInfoService } from '../../service/student-info.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor( private sc:StudentInfoService) { }

  ngOnInit() {
  }
  info(name,cls)
  {
    this.sc.receiveInfo(name,cls);
   // console.log(name,cls);
  }

}
