import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dummy } from './dummy';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Dummy', () => {
  let component: Dummy;
  let fixture: ComponentFixture<Dummy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dummy],
      providers: [
        provideZonelessChangeDetection() 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dummy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
