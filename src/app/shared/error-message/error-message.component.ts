import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: false,
})
export class ErrorMessageComponent {
  @Input() title = 'Något gick fel';
  @Input() message = 'Ett oväntat fel uppstod. Vänligen försök igen.';
  @Input() showRetry = false;
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}