import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosvotosComponent } from './registrosvotos.component';

describe('RegistrosvotosComponent', () => {
  let component: RegistrosvotosComponent;
  let fixture: ComponentFixture<RegistrosvotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrosvotosComponent]
    });
    fixture = TestBed.createComponent(RegistrosvotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
