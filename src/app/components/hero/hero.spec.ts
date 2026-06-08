import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Hero Component', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Hero],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test that bind its input property on its template', () => {
    fixture.componentRef.setInput('hero', {
      id: 1,
      name: 'batMan',
      strength: 38,
    });

    expect(component.hero.name).toEqual('batMan');
    fixture.detectChanges()
    let spanTag=fixture.debugElement.query(By.css('span'))
    expect(spanTag.nativeElement.textContent).toContain(1)
    
    let divTag=fixture.debugElement.query(By.css('div'))
    expect(divTag.nativeElement.textContent).toContain('batMan')
  });
});
