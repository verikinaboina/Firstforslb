import { Component, OnInit } from '@angular/core';
import { appContent } from './app.content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'turbo';
  public appContent: any;
  isavailable = false;

  ngOnInit() {
    this.appContent = appContent.appComponent;
  }

  // myClickFunction(event: any) {
  //   //just added console.log which will display the event details in browser on click of the button.
  //   alert("Button is clicked");
  //   console.log(event);
  // }

   myClickFunction(event) {
      this.isavailable = false;
   }

  //array of months.
  months = ["January", "Feburary", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];

  changemonths(event) {
    alert("Changed month from the Dropdown");
  }
}
