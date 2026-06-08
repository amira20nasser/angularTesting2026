import { StrengthPipe } from './strength-pipe';

describe('Strength Pipe', () => {
  let pipe: StrengthPipe;
  beforeEach(() => {
    pipe = new StrengthPipe();
  });

  it('return weak if value < 10',()=>{
    expect(pipe.transform(5)).toMatch(/weak/)
  })
  it('return strong if value >= 10 && value < 2',()=>{
    expect(pipe.transform(13)).toMatch(/strong/)
  })
});
