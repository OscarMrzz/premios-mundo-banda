import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarranavegacionComponent } from './barranavegacion.component';

describe('BarranavegacionComponent', () => {
  let component: BarranavegacionComponent;
  let fixture: ComponentFixture<BarranavegacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarranavegacionComponent]
    });
    fixture = TestBed.createComponent(BarranavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
