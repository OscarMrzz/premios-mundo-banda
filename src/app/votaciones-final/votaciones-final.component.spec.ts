import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotacionesFinalComponent } from './votaciones-final.component';

describe('VotacionesFinalComponent', () => {
  let component: VotacionesFinalComponent;
  let fixture: ComponentFixture<VotacionesFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotacionesFinalComponent]
    });
    fixture = TestBed.createComponent(VotacionesFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
