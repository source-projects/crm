import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmservicesService } from '../../crm-services/crmservices.service';
import { onlyChar } from '../../../client/validators/validation';
import Swal from 'sweetalert2';
import { RecordUpdated, RecordAdded } from '../../../client/sweetalert/sweetalert';
import { SweetalertServiceService } from 'src/app/modules/client/sweetalert/sweetalert-service.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-product-family-form',
  templateUrl: './product-family-form.component.html',
  styleUrls: ['./product-family-form.component.scss','../../crm/crm.component.scss']
})
export class ProductFamilyFormComponent implements OnInit {

  
  constructor( private service : CrmservicesService,public translate: TranslateService, private alertService: SweetalertServiceService, private route:ActivatedRoute, private router:Router) { 
  }

 
  @ViewChild('file') myFileInput:any;
  @ViewChild('files') myInputVariable:any;
  addClass:boolean= true;
  private parameter: any;
  prodId:any;
  data :any;
  actionBtn:string="Save";
  isupdate:boolean = false;
  productFamilyIcons:any;
  file:any;
 
  
  ngOnInit(): void {

    this.route.queryParams.subscribe((params :any)=>{
      this.parameter = params;
      this.prodId = this.parameter.data;
      console.log(this.prodId  , 'fam');
      console.log(this.parameter, 'para');
     })  
  
  
  if(this.prodId!=undefined)
    this.actionBtn = "Update";
     this.service.getproductId(this.prodId).subscribe(res => {
       this.data = res;
       console.log(res);
  
       if(this.data){
        // this.actionBtn ="Update"
        this.isupdate =true;
        this.productFamily.controls['productFamilyId'].setValue(this.data.productFamilyId);
        this.productFamily.controls['productFamily'].setValue(this.data.productFamily);
        this.productFamily.controls['description'].setValue(this.data.description);
        this.productFamily.controls['productFamilyIcon'].setValue(this.data.productFamilyIcon);
        this.productFamilyIcons = this.data.productFamilyIcon;
        console.log(this.data.productFamilyIcon, 'ertuop[');
        
       }
     })
    }
  

  productFamily = new FormGroup({
    'productFamilyId' : new FormControl(''),
    'productFamily' :new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/), onlyChar]),
    'description' :new FormControl('', [Validators.required, Validators.maxLength(400), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
    'productFamilyIcon' :new FormControl(''),
    'createdBy' :new FormControl('-1', Validators.required),
    'updatedBy' :new FormControl('-1', Validators.required),
  }) 

  submit(){
    if(this.isupdate){
    this.productFamily.valid ? this.updateProductFamily() : "";
    
    }
    else{
      // this.postProductFamily();
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('productFamily', JSON.stringify(this.productFamily.value));
      this.service.productFamilyPost(formData).subscribe((res)=>{
        // alert('Record added');
        this.resetForm();
        this.alertService.RecordAdded('crm/product-family');
      
        // this.router.navigate(['crm/product-family']); 
           
      },
      (error)=>{
        alert(error);
      })

    }
  }

 

  //Update 
  updateProductFamily(){
    console.log(this.productFamily, 'hrsh');   
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('productFamily', JSON.stringify(this.productFamily.value)); 
    this.service.putProductFamily(formData).
    subscribe({
      next:(res)=>{
        // RecordUpdated()
        // alert("Record Updated");
        // this.resetForm();
        // this.router.navigate(['crm/product-family']); 
        this.alertService.RecordUpdated('crm/product-family');
      },
      error:()=>{
        alert("Error while updating the record");
      }
    })
      

 
  }

  resetForm(){
    this.productFamily.controls['productFamily'].reset();
    this.productFamily.controls['description'].reset();
    this.productFamilyIcons ='';

  }




  get productFamilyName(){
    return this.productFamily.get('productFamily');
  }

  get description(){
    return this.productFamily.get('description');
  }
  
  get productFamilyIcon(){
    return this.productFamily.get('description');
  }

    // File
    onFileSelect(event:any){
    
      if(event.target.files.length > 0) {
        this.file = event.target.files.item(0);
        // alert("file"+this.file);
        var reader = new FileReader();
        reader.readAsDataURL(this.file); 
        reader.onload = (_event) => { 
          this.productFamilyIcons = reader.result; 
        }
       
      }
    }

    
// update
  sweettalert7() {
    Swal.fire({
      title: 'Updated',
      text: 'You data is updated!',
      icon: 'success',
      cancelButtonText: 'Ok',
      
    })

  }

  // add
  sweettalert9() {

    Swal.fire({
      title: 'Success',
      text: 'Record Added successfully',
      icon: 'success',
      cancelButtonText: 'Ok',


    })
  }
}
