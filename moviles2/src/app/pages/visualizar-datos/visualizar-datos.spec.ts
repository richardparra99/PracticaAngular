import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDatos } from './visualizar-datos';

describe('VisualizarDatos', () => {
  let component: VisualizarDatos;
  let fixture: ComponentFixture<VisualizarDatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarDatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarDatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
