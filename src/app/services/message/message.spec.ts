import { MessageService } from './message.service';

describe('Message  Service', () => {
  let service: MessageService;
  beforeEach(() => {
    service = new MessageService();
  });

  it('Test add function', () => {
    service.add('hello from Test');
    expect(service.messages).toHaveSize(1);
  });
  it('Test clear function', () => {
    service.add('hello from Test1');
    service.add('hello from Test2');
    service.add('hello from Test3');

    service.clear()
    expect(service.messages).toHaveSize(0);
  });
});
