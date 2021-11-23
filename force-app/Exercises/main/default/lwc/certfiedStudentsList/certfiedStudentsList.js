import { LightningElement, wire, api } from "lwc";
import getCertifiedStudent from "@salesforce/apex/CertifiedStudentList.getCertifiedStudent";

export default class CertfiedStudentsList extends LightningElement {
	@api certificationId = 0;
	@api certificationName = "";
	certifiedStudents = [];
	error;

	@wire(getCertifiedStudent, { certificationId: "$certificationId" }) wiredstudentsList(result) {
		this.certifiedStudents = [];
		if (result.data) {
			this.certifiedStudents = result.data.map((cert) => ({
				certificationHeldId: cert.Id,
				contactId: cert.Certfied_Professional__r.Id,
				phone: cert.Certfied_Professional__r.Phone,
				name: cert.Certfied_Professional__r.Name,
				date: cert.Date_Achieved__c,
				email: cert.Certfied_Professional__r.Email
			}));
		} else if (result.error) {
			this.error = error;
		}
	}

	columns = [
		{ type: "text", fieldName: "Name", Label: "Professionals Name" },
		{ type: "text", fieldName: "date", Label: "Date Certification Achieved" },
		{ type: "phone", fieldName: "phone", Label: "Phone" },
		{ type: "email", fieldName: "email", Label: "Email" }
	];
}
