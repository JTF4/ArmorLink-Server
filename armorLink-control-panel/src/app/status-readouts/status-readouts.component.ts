import { Component } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-status-readouts',
  templateUrl: './status-readouts.component.html',
  styleUrls: ['./status-readouts.component.scss'],
  providers: [SocketService]
})
export class StatusReadoutsComponent {

  constructor(private SocketService:SocketService) {
    
  }

}
