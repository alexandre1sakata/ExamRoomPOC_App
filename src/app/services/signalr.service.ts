import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;

  constructor (private toastr: ToastrService) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5000/hub-notes-actions')
                            .build();

    this.hubConnection.start();
  }
  
  public receiveNotesAction = () => {
    this.hubConnection.on('ReceiveNotesAction', (action: string) => {
      switch (action) {
        case 'Insert':
            this.toastr.info('Notes', 'A note has been added!');
            break;
        case 'Update':
            this.toastr.info('Notes', 'A note has been changed!');
            break;
        case 'Delete':
            this.toastr.info('Notes', 'A note has been deleted!');
            break;
      }
    });
  }
}
