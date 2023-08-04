import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { CredentialService } from 'src/app/services/credentials/credentials.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailssComponent {

  rfq_master_id : any;
  details:any;
  files:any;
  fileHistory:any

  constructor(private route: ActivatedRoute, private service: CredentialService,public router: Router ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params['data']);
      this.rfq_master_id = data.rfq_request_master_id
    });
    this.viewDeatils();
    this.getFiles();
  }

  viewDeatils(){
    this.service.viewMoreDetails(this.rfq_master_id).subscribe((data:any)=>{
      this.details = data.viewMoreDetails[0];
      console.log(this.details);          
    });
  }

  shouldShowRejectedComments(details:any): boolean {
    return !!details.rejected_comments; // Returns true if rejected_comments is not empty, null, or undefined
  }
  

  getFiles(){
    this.service.getFileHistory(this.rfq_master_id).subscribe((data:any)=>{
      this.fileHistory = data.fileHistoryList    
      console.log(this.fileHistory); 
      console.log(data);
    });
  }

  ngOnDestroy(): void {}

  getFileUrl(fileList: any[], fileType: string): string {
    const file = fileList.find((item) => item.file_type === fileType);
    return file ? file.file_path : '';
  }
  
  getFileName(fileList: any[], fileType: string): string {
    const file = fileList.find((item) => item.file_type === fileType);
    return file ? file.original_file_name : '';
  }

 
  downloadFileInHistory(fileHistory:any){
    var fileDetails = {
      file_path: fileHistory.file_path,
      file_name: fileHistory.original_file_name
    }
      this.service.downloadFieInHistory(fileDetails).subscribe((data:any)=>{
        console.log(data,"download filehistory files................................");        
        if (data.fileList != null) {  
          this.service.singleFileDownload(data.fileList.filePath).subscribe((blobData: Blob) => {
            // Handle successful response and file download here
            saveAs(blobData,data.fileList.originalName);
          });
        }else{
              Swal.fire({
                icon: 'error',
                title: 'Zettaboard',
                text: data.msg,
              });
        }
      });
  }

  downloadFile(fileList: any[], fileType: string): void {
    const file = fileList.find((item) => item.file_type === fileType);    
    if (file) {
      var fileDetails = {
        file_path: file.file_path,
        file_name: file.original_file_name
      }      
      this.service.downloadIndividualFile(fileDetails).subscribe((data:any)=>{
        console.log(data,"download view files................................");        
        if (data.fileList != null) {  
          this.service.singleFileDownload(data.fileList.filePath).subscribe((blobData: Blob) => {
            // Handle successful response and file download here
            saveAs(blobData,data.fileList.originalName);
          });
        }else{
              Swal.fire({
                icon: 'error',
                title: 'Zettaboard',
                text: data.msg,
              });
        }
      })
    }
  }

  isBackButton() {
    this.router.navigate(['/bd_user/bd_dashboard']);
  }
  
  formatVersion(version: number): string {
    return version.toFixed(1);
  }
}
