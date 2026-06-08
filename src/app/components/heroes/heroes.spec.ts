
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heroes } from './heroes';
import {
  Component,
  input,
  provideZonelessChangeDetection,
} from '@angular/core';
import { HeroService } from '../../services/hero-service/hero.service';
import { Ihero } from '../../models/ihero';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// fake hero component
@Component({
  template: '',
  selector: 'app-hero',
})
class HeroFake {
  hero = input<Ihero>();
}

describe('Heroes Component', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;
  let heroServiceFake: jasmine.SpyObj<HeroService>;

  const herosFake: Ihero[] = [
    { id: 1, name: 'superMan', strength: 30 },
    { id: 2, name: 'batman', strength: 36 },
    { id: 3, name: 'AntMan', strength: 38 },
  ];

  beforeEach(async () => {
    heroServiceFake = jasmine.createSpyObj('HeroService', [
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    heroServiceFake.getHeroes.and.returnValue(of(herosFake));

    await TestBed.configureTestingModule({
      imports: [Heroes],
      providers: [
        { provide: HeroService, useValue: heroServiceFake },
        provideZonelessChangeDetection(),
      ],
    }).overrideComponent(Heroes, {
        set: {
          imports: [HeroFake],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heros from service',()=>{
    component.ngOnInit()
    expect(heroServiceFake.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toEqual(herosFake)

    fixture.detectChanges()

    let childs=fixture.debugElement.queryAll(By.directive(HeroFake))
    expect(childs.length).toBe(3)
    expect(childs[0].componentInstance.hero()).toEqual(herosFake[0])
    
  })
});
