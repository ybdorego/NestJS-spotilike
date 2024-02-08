import { CommonModule } from '@angular/common';
import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = 'top-trimmed';
    // if(this.collapsed && this.screenWidth > 768) {
    //   styleClass = 'top-trimmed';
    // } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
    //   styleClass = 'top-md-screen'
    // }
    return styleClass;
  }

}
