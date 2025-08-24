import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteImagen } from './componente-imagen';

describe('ComponenteImagen', () => {
  let component: ComponenteImagen;
  let fixture: ComponentFixture<ComponenteImagen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteImagen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteImagen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
