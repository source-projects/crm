import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AllservicesService } from 'src/app/modules/client/services/allservices.service';
// import { onlyChar } from 'src/app/modules/client/validators/validation';
import { onlyChar, selectValidation } from '../../../client/validators/validation';
import { CrmservicesService } from '../../crm-services/crmservices.service';
import { RecordUpdated, RecordAdded, UserCreated } from '../../../client/sweetalert/sweetalert';
import { ConfirmedValidator } from '../changepassword/validator';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss','../../crm/crm.component.scss']
})
export class CreateUserComponent implements OnInit {

  // getAccessToken!:string;
  // actionBtn:string = "Add";
  accessToken:any; 
  roles:any=[];
  options:any;
  roleArray:any=[];
  checked :boolean = true; 
  createUser = new FormGroup({});

  constructor( private service:CrmservicesService,private fb: FormBuilder, private http: HttpClient, private router : Router) {
    this.createUser = fb.group({ 
      firstName:['',[Validators.required, Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), onlyChar]],
      lastName:['',[Validators.required, Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), onlyChar]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      confirm_password: ['', [Validators.required]],
      isTemporary: new FormControl('',[Validators.required]),
      role: new FormControl('',[selectValidation, Validators.required])
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
   }

  ngOnInit(): void {
    // this.getAccessToken();
   this.getRoles();
  }
 
  //  createUser = new FormGroup({
  //   firstName : new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), onlyChar]),
  //   lastName : new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  //   email : new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  //   password : new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
  //   // roles: new FormArray([],[selectValidation]),
  //   isTemporary: new FormControl(''),
  //   role: new FormControl('',[selectValidation, Validators.required])
  // })

  

  getRoles(){
    // this.http.get('http://192.168.1.11:8030/roles/getroles').subscribe((response)=>{
      this.service.getAllRoles().subscribe((response)=>{
      // console.log(JSON.stringify(response)+"ane");
      this.roles = response;
    }),
    (errror)=>{
      // alert('Error while fecthing roles');
    }
  }

  submit(){
  
    this.roleArray.push(this.createUser.get('role').value);
    console.log(this.roleArray);
    this.createUser.get('role').setValue(this.roleArray);
    console.log(this.createUser);
   
    console.log("1234567890-="+ JSON.stringify(this.createUser.value));
    // console.log(""+this.service.post);
    this.service.postNewUser(this.createUser.value).subscribe((res)=>{
      // alert("User Created ");
      UserCreated();
      this.resetForm();
      
      this.router.navigate(['/crm/user-all'])
    },
    (error)=>{
      // alert(JSON.stringify(error));
      console.log(error);
     console.log( this.createUser.value);
    })
  }

  resetForm(){
    this.createUser.controls['firstName'].reset();
    this.createUser.controls['lastName'].reset();
    this.createUser.controls['email'].reset();
    this.createUser.controls['password'].reset();
    this.createUser.controls['role'].reset();
  }


 

  get firstName(){
    return this.createUser.get('firstName');
  }

  get lastName(){
    return this.createUser.get('lastName');
  }

  get emailTemplateName(){
    return this.createUser.get('emailTemplateName');
  }

  get email(){
    return this.createUser.get('email');
  }

  get password(){
    return this.createUser.get('password');
  }
  get confirm_password(){
    return this.createUser.get('confirm_password');
  }
  
  get role(){
    return this.createUser.get('role');
  }
  get isTemporary(){
    return this.createUser.get('role');
  }


  


}
