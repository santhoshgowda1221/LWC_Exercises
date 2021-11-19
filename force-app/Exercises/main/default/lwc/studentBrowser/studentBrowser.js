import { LightningElement, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";
export default class StudentBrowser extends LightningElement {
	selectedInstructorId = "";
	selectedDeliveryId = "";

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" }) students;
	//can write logic here for error and data
	// @wire(getStudents,{instructorId:'', courseDeliveryId:''}) students({error , data}){};

	handleFilterCHange(event) {
		this.selectedInstructorId = event.detail.instructorId;
		this.selectedDeliveryId = event.detail.deliveryId;
	}

   
}
