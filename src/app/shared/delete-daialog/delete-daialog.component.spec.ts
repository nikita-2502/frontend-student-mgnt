import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDaialogComponent } from './delete-daialog.component';

describe('DeleteDaialogComponent', () => {
  let component: DeleteDaialogComponent;
  let fixture: ComponentFixture<DeleteDaialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDaialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDaialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
