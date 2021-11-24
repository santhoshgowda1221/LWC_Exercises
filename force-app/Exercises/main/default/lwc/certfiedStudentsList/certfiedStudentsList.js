import { LightningElement, api, wire } from 'lwc';
import getCertifiedStudents from '@salesforce/apex/CertifiedStudentList.getCertifiedStudent';
import deleteStudentCertifications from '@salesforce/apex/CertifiedStudentList.deleteStudentCertifications';
import {refreshApex} from '@salesforce/apex';


export default class CertifiedStudentsList extends LightningElement {
    @api certificationId = 0;
    @api certificationName = '';
    certifiedStudents=[];
    wiredStudentResult;
    error;
    @wire(getCertifiedStudents,{certificationId : '$certificationId'}) wiredStudentsList(result){
        this.wiredStudentResult = result;
        this.certifiedStudents=[];
        if(result.data){
           this.certifiedStudents = result.data.map (cert => ({
            certificationHeldId: cert.Id,
            contactId: cert.Certified_Professional__r.Id,
            phone: cert.Certified_Professional__r.Phone,
            name: cert.Certified_Professional__r.Name,
            date: cert.Date_Achieved__c,
            email: cert.Certified_Professional__r.Email
           }));
        }
        else if(result.error){
            this.error = error;
        }
    }
    columns = [
		{ type: "text", fieldName: "name", label: "Professionals Name" },
		{ type: "text", fieldName: "date", label: "Date Certification Achieved" },
		{ type: "phone", fieldName: "phone", label: "Phone" },
		{ type: "email", fieldName: "email", label: "Email" }
	];

    onCertActions(event){
        const btnId = event.target.getAttribute("data-btn-id");
        switch(btnId){
            case "btnEmail" :
                break;
            case "btnCert" :
                break;
            case "btnDelete" :
                this.onDelete();    
                break;
            default:
                break;
        }
    }

    selectedIds(){
        const ref = this.template.querySelector('lightning-datatable');
        const ids = ref.getSelectedRows().map(r => r.certificationHeldId);
        return ids;
    }

    onDelete(){
        const certificationIds = this.selectedIds();
        deleteStudentCertifications({certificationIds}).then(() => {
            refreshApex(this.wiredStudentResult);
        }).catch(error => {
            this.error = error;
        });
    }

}