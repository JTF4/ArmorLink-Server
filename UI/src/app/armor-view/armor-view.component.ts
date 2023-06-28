import { Component, Input } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-armor-view',
  templateUrl: './armor-view.component.html',
  styleUrls: ['./armor-view.component.scss'],
  providers: [SocketService]
})
export class ArmorViewComponent {

  private colorMap;

  constructor(private SocketService:SocketService) {
    this.colorMap = this.SocketService.getColorMap();
  }
  // Component logic and methods go here
}