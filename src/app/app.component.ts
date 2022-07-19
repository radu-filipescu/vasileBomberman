import {Component, HostListener} from '@angular/core';
import {GlobalService} from "./global/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vasile';

  constructor(private globalService: GlobalService) {
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: any) {
    this.globalService.keyPressEvent.emit(event.key);
  }
}
