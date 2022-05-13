import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllservicesService } from 'src/app/modules/client/services/allservices.service';
// import { onlyChar } from 'src/app/modules/client/validators/validation';
import { onlyChar, selectValidation } from '../../../client/validators/validation';
import { CrmservicesService } from '../../crm-services/crmservices.service';
import { ToastrService } from 'ngx-toastr';
import { SweetalertServiceService } from 'src/app/modules/client/sweetalert/sweetalert-service.service';
import { emailAlreadyTaken } from 'src/app/modules/client/sweetalert/sweetalert';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss', '../../crm/crm.component.scss']
})
export class CreateUserComponent implements OnInit {
  accessToken: any;
  roles: any = [];
  options: any;
  label = "Add";
  SelectedArray: any = [];
  alluserrolesdata: any = [];
  passwordType: string = 'password';
  passwordShown: boolean = false;
  passwordType1: string = 'password';
  passwordShown1: boolean = false;
  constructor(private alertService: SweetalertServiceService, private service: CrmservicesService, private http: HttpClient, private router: Router, private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      if (params.id != undefined && params.id != null) {
        this.service.edituser(params.id).subscribe((data: any) => {
          this.label = "Update";
          this.createUser.addControl("userId",
            new FormControl(params.id, Validators.required));
          this.createUser.removeControl('password');
          this.createUser.removeControl('confirm_password');
          this.createUser.patchValue(data);
          this.alluserrolesdata = data.avaliableRoles;
          this.SelectedArray = data.role;
        });
      } else {
        this.label = "Add";
        this.service.getallRoles().subscribe((data: any) => {
          let data1 = [];
          
          data1 = data.map(x => x.name);
          this.alluserrolesdata = data1;
        })
      }
    });


  }

  ngOnInit(): void {
    this.getRoles();
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';

    }
    else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  togglePassword1() {
    if (this.passwordShown1) {
      this.passwordShown1 = false;
      this.passwordType1 = 'password';

    }
    else {
      this.passwordShown1 = true;
      this.passwordType1 = 'text';
    }
  }


  createUser = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), onlyChar]),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    isTemporary : new FormControl(false),
  })

  getRoles() {
    this.service.getAllRoles().subscribe((response) => {
      this.roles = response;
    }),
      (errror) => {
        alert('Error while fecthing roles');
      }
  }

  reset(){
    this.createUser.controls['firstName'].reset();
    this.createUser.controls['lastName'].reset();
    this.createUser.controls['email'].reset();
    this.createUser.controls['password'].reset();
    this.createUser.controls['confirm_password'].reset();
    this.createUser.controls['role'].reset();

  }
  submit() {
    console.log(this.createUser.value);
    if (this.label == "Update") {
      this.service.postOldUser(this.createUser.value).subscribe((res) => {
        this.alertService.RecordUpdated('/crm/user-all');
      },
        (error) => {
          alert(JSON.stringify(error));

        })

    } else {
      this.service.postNewUser(this.createUser.value).subscribe((res) => {
        this.alertService.RecordAdded('/crm/user-all');
      },
      
        (error) => {
          if(error.status == 409){
            emailAlreadyTaken();
          }
        });
    }



  }
  exportSelectedArray(value) {
    this.SelectedArray = value;
    this.createUser.controls['role'].patchValue(value);
  }

  get getControl() {
    return this.createUser.controls;
  }
  // get firstName() {
  //   return this.createUser.get('firstName');
  // }

  // get lastName() {
  //   return this.createUser.get('lastName');
  // }

  // get emailTemplateName() {
  //   return this.createUser.get('emailTemplateName');
  // }

  // get email() {
  //   return this.createUser.get('email');
  // }

  // get password() {
  //   return this.createUser.get('password');
  // }
  // get confirm_password() {
  //   return this.createUser.get('confirm_password');
  // }

  // get role() {
  //   return this.createUser.get('role');
  // }
  // get isTemporary() {
  //   return this.createUser.get('isTemporary');
  // }
}
