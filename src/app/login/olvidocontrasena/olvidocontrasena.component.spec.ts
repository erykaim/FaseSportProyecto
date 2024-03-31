import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidocontrasenaComponent } from './olvidocontrasena.component';

describe('OlvidocontrasenaComponent', () => {
  let component: OlvidocontrasenaComponent;
  let fixture: ComponentFixture<OlvidocontrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlvidocontrasenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlvidocontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
