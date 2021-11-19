import { LightningElement, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import {publish, MessageContext} from 'lightning/messageService';
export default class StudentBrowser extends LightningElement {
    @wire(MessageContext) info;
	selectedInstructorId = "";
	selectedDeliveryId = "";

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" }) students;
	//can write logic here for error and data
	// @wire(getStudents,{instructorId:'', courseDeliveryId:''}) students({error , data}){};

	handleFilterCHange(event) {
		this.selectedInstructorId = event.detail.instructorId;
		this.selectedDeliveryId = event.detail.deliveryId;
	}

    handleStudentSelected(event){
 const updatedStudentId = event.detail.studentId;
 console.log(updatedStudentId);
 this.updateSelectedStudent(updatedStudentId);
    }

    updateSelectedStudent(updatedStudentId){
        publish(this.info, SELECTED_STUDENT_CHANNEL , {studentId:updatedStudentId} );
    }
}
