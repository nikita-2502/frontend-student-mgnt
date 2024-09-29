import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../shared/modals/user';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  userSubject: Subscription = new Subscription();
  isMenu: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.userSubject = this.authService.userD.subscribe((user) => {
      // console.log('user: ', user);
      if (user) {
        this.isLogged = user ? true : false;
      }
    });
  }

  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  onMenuClicked() {
    this.isMenu = !this.isMenu;
    this.commonService.menu1.next(this.isMenu);
  }
}
