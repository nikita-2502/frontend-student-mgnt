import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CommonService } from './shared/services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'student';

  errorMsg: string = '';

  subscription = new Subscription();
  constructor(
    private authService: AuthService
  ) // private commonService: CommonService
  {}

  ngOnInit() {
    this.authService.autoLogin();
    // this.subscription = this.commonService.demo2.subscribe((res: any) => {
    //   console.log('app comp: ', res);
    //   this.errorMsg = res;
    // })
  }
}
