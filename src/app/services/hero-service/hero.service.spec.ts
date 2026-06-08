import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { MessageService } from '../message/message.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Hero Service', () => {
  let httpTesting: HttpTestingController;
  let service: HeroService;
  const heroesUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    const messageServiceFake = jasmine.createSpyObj('MessageService', ['add']);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MessageService, useValue: messageServiceFake },
        provideZonelessChangeDetection(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  it('should make a GET request to fetch hero by id', () => {
    service.getHero(2).subscribe((data) => {
      expect(data.strength).toBe(38);
    });

    const testReq = httpTesting.expectOne(`${heroesUrl}/2`);
    expect(testReq.request.method).toBe('GET');

    testReq.flush({
      id: 2,
      name: 'superMan',
      strength: 38,
    });
  });
  it('should make a POST request to new Hero ', () => {
    const hero = { id: 3, name: 'BatMan', strength: 38 };

    service.addHero(hero).subscribe((data) => {
      expect(data).toEqual(hero);
    });

    const testReq = httpTesting.expectOne(heroesUrl);

    expect(testReq.request.method).toBe('POST');
    expect(testReq.request.body).toEqual(hero);

    testReq.flush(hero);
  });
});
