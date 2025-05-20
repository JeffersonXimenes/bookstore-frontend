import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent {
  @Input() title: string = 'Erro';
  @Input() messages: string[] = [];
  @Input() visible: boolean = false;

  closeModal() {
    this.visible = false;
  }
}
