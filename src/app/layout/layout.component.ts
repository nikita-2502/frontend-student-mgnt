import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isMenu: boolean = false;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.menu2.subscribe((res) => {
      this.isMenu = res;
    });
  }

}
