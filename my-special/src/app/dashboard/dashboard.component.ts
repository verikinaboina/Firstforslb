import { Component, OnInit } from '@angular/core';
import { appContent } from '../app.content';
import { ModalService } from '../shared/_services/modal.sevices';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'turbo';
  public appContent: any;
  isavailable = false;
  public bodyText: string;
  UserName: string;

  constructor(private modalService: ModalService) {
  }
  ngOnInit() {
    this.appContent = appContent.appComponent;
    this.UserName = this.modalService.getUserName();
    this.bodyText = 'This text can be updated in modal 1';


  }

  // openModal(id: string){
  //   this.modalService.open(id);
  // }

  // closeModal(id: string){
  //   this.modalService.close(id);
  // }

  // myClickFunction(event) {
  //   this.isavailable = false;
  // }

  //array of months.
  months = ["January", "Feburary", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];

  changemonths(event) {
    alert("Changed month from the Dropdown");
  }


}
