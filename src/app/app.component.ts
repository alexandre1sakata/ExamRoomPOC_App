import { Component } from '@angular/core';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ExamRoomPOCApp';

  constructor(
    private signalRService: SignalRService
  ) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.receiveNotesAction();
  }
}
