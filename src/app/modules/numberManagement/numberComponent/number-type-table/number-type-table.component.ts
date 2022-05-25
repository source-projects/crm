import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertServiceService } from 'src/app/modules/client/sweetalert/sweetalert-service.service';
import { CrmservicesService } from 'src/app/modules/crm/crm-services/crmservices.service';

@Component({
  selector: 'number-type-table',
  templateUrl: './number-type-table.component.html',
  styleUrls: ['./number-type-table.component.scss']
})
export class NumberTypeTableComponent implements OnInit {

  permission:any=[true,true,true];
  headerList:any=[];
  constructor(private allService:CrmservicesService,private router:Router,
    private sweetAlert: SweetalertServiceService) { }
  data:any={};
  ajayStri : any ;
  pageNo:any;
  pageSize:any;
  sortBy:any;
  sortDirection:any;
  url="pageNo=1&pageSize=5";
  ngOnInit(): void {
    this.allService.getproductHierarchy("pageNo=1&pageSize=5").subscribe(sucess=>{
    this.headerList=sucess.headerlist  ;
    this.data=sucess.page;
    },error=>{

    }
    );
  }
  changePageSortSearch(url:any){
    this.url=url;
    this.allService.getproductHierarchy(url).subscribe(sucess=>{
      this.data=sucess.page;
      },error=>{});
  }
  onDelete(){
    this.allService.getproductHierarchy(this.url).subscribe(sucess=>{
      this.data=sucess.page;
      },error=>{}
      );
  }
buttonEvent1(data:any){
if(data.event=='add'){
  this.router.navigate(['/number/numberType']);   
}else if(data.event=='edit'){
  this.router.navigate(['/number/numberType'],{ queryParams: { data: JSON.stringify(data.data.productHierarchyId)} });
    console.log(data, 'data')
}
 else if(data.event=='delete'){
   this.allService.deleteHierarchy(data.data.productHierarchyId).subscribe((res)=>{
    this.sweetAlert.recordDeleted();  
    this.onDelete();
   })
 } 
  
}
}