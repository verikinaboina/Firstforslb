import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ModalService } from '../shared/_services/modal.sevices';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  constructor(private router: Router,private formBuilder:FormBuilder,private modalService:ModalService){
    
  }
  ngOnInit() {

    this.form = this.formBuilder.group({
      UserName: ['',[Validators.required]],
      Password: ['',[Validators.required]],
    });
    
  }

  submitForm() {
   this.modalService.setUserName(this.form.controls.UserName.value);
    this.router.navigate(['/dashboard']);
  }
}
