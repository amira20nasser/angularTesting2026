
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MessagesForLab } from './messages.lab';
import { MessageService } from '../../services/message/message.service';

describe('MessagesForLab', () => {
  let component: MessagesForLab;
  let fixture: ComponentFixture<MessagesForLab>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [MessagesForLab],
      providers: [MessageService]
    })
      .overrideComponent(MessagesForLab, {
        set: {
          template: `
            <ng-container *ngIf="messageService.messages.length">
              <div id="container">
                <div class="msg" *ngFor="let message of messageService.messages">{{ message.message }}</div>
              </div>
            </ng-container>
          `
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesForLab);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
  });

  it('expect component to be created', () => {
    expect(component).toBeTruthy();
  });

  it('expect component template to be empty when no messages exist', () => {
    messageService.clear();
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('#container');
    expect(container).toBeNull();
  });

  it('then expect div.msg to have the messages after setting it', () => {
    messageService.add('first message');
    messageService.add('second message');
    fixture.detectChanges();

    const messageElements = fixture.nativeElement.querySelectorAll('.msg');
    expect(messageElements.length).toBe(2);
    expect(messageElements[0].textContent.trim()).toBe('first message');
    expect(messageElements[1].textContent.trim()).toBe('second message');
  });
});