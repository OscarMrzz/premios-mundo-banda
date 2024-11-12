import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreausuariosComponent } from './areausuarios.component';

describe('AreausuariosComponent', () => {
  let component: AreausuariosComponent;
  let fixture: ComponentFixture<AreausuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreausuariosComponent]
    });
    fixture = TestBed.createComponent(AreausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
