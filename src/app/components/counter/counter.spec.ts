import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Counter Component', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Counter],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind counter =0 in p tag', () => {
    fixture.detectChanges();
    let pTag = fixture.debugElement.query(By.css('p'));
    expect(pTag.nativeElement.textContent).toContain(0);
  });

  it('test should increase counter when click on + button', () => {
    let inceasebtn = fixture.debugElement.query(By.css('#inc'));
    let pTag = fixture.debugElement.query(By.css('p'));
    inceasebtn.triggerEventHandler('click');
    inceasebtn.triggerEventHandler('click');
    inceasebtn.triggerEventHandler('click');

    expect(component.counter).toBe(3);
    fixture.detectChanges();
    
    expect(pTag.nativeElement.textContent).toContain(3);
  });
});
