import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { Ihero } from '../../models/ihero';

describe('HeroServiceForLab', () => {
  let service: HeroServiceForLab;
  let httpTestingController: HttpTestingController;
  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroServiceForLab]
    });

    service = TestBed.inject(HeroServiceForLab);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getHeroes function: send request and receive response successfully', () => {
    const expectedHeroes: Ihero[] = [
      { id: 1, name: 'Iron Man', strength: 60 },
      { id: 2, name: 'Spider-Man', strength: 55 }
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
    });

    const req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(expectedHeroes);
  });

  it('updateHero function: send request and receive response successfully', () => {
    const hero: Ihero = { id: 1, name: 'Iron Man', strength: 60 };

    service.updateHero(hero).subscribe((response) => {
      expect(response).toEqual(hero);
    });

    const req = httpTestingController.expectOne(heroesUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(hero);
    req.flush(hero);
  });
});