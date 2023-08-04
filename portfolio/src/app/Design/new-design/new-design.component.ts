import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialService } from 'src/app/services/credentials/credentials.service';

@Component({
  selector: 'app-new-design',
  templateUrl: './new-design.component.html',
  styleUrls: ['./new-design.component.scss']
})
export class NewDesignComponent implements OnInit {

  datas:any;

  constructor(private bdDetails : CredentialService,public router: Router){}

  ngOnInit(): void {
    var userDetails = {bd_user_id:1, role_id:3};    
    this.bdDetails.getRFQ(userDetails).subscribe((data:any) => {
      console.log(data); 
      this.datas = data.rfqDetails;
    });
  }

  projectDetails(element : any) {
    console.log(element); 
    console.log(element.rfq_request_master_id); 
    const queryParams = {
      data: JSON.stringify(element),
      data2:element.rfq_request_master_id
    };
    this.router.navigate(['/view-detailss'], { queryParams });
  }  
}