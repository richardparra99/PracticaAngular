import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieFormPage } from './movie-form.page';

describe('MovieFormPage', () => {
  let component: MovieFormPage;
  let fixture: ComponentFixture<MovieFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
