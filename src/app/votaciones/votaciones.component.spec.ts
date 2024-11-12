import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionesComponent } from './votaciones.component';

describe('VotacionesComponent', () => {
  let component: VotacionesComponent;
  let fixture: ComponentFixture<VotacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotacionesComponent]
    });
    fixture = TestBed.createComponent(VotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
