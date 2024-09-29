import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './commonComp/footer/footer.component';
import { HeaderComponent } from './commonComp/header/header.component';
import { SidebarComponent } from './commonComp/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

const materials = [
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatMenuModule,
];

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, materials],
})
export class LayoutModule {}
