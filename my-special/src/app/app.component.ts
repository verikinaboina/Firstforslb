import { Component, OnInit } from '@angular/core';
import { appContent } from './app.content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'turbo';
  public appContent: any;

  ngOnInit() {
    this.appContent = appContent.appComponent;
    }

}
