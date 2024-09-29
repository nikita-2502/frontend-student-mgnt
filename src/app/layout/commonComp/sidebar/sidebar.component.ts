import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.menu2.subscribe((res) => {
      this.drawer.toggle()
    });
  }
}
