import { LightningElement, wire } from "lwc";
import getStudents from "@salesforce/apex/StudentBrowser.getStudents";
import SELECTED_STUDENT_CHANNEL from "@salesforce/messageChannel/SelectedStudentChannel__c";
import { publish, MessageContext } from "lightning/messageService";
import { NavigationMixin } from "lightning/navigation";
export default class StudentBrowser extends NavigationMixin(LightningElement) {
	@wire(MessageContext) info;
	selectedInstructorId = "";
	selectedDeliveryId = "";

	@wire(getStudents, { instructorId: "$selectedInstructorId", courseDeliveryId: "$selectedDeliveryId" }) students;
	//can write logic here for error and data
	// @wire(getStudents,{instructorId:'', courseDeliveryId:''}) students({error , data}){};

	cols = [
		{
			fieldName: "Name",
			label: "Name"
		},
		{
			fieldName: "Title",
			label: "Title",
			hiddenOnMobile: true
		},
		{
			fieldName: "Phone",
			label: "Phone",
			type: "phone"
		},
		{
			fieldName: "Email",
			label: "E-Mail",
			type: "email"
		}
	];

	handleFilterCHange(event) {
		this.selectedInstructorId = event.detail.instructorId;
		this.selectedDeliveryId = event.detail.deliveryId;
	}

	handleStudentSelected(event) {
		const updatedStudentId = event.detail.studentId;
		console.log(updatedStudentId);
		this.updateSelectedStudent(updatedStudentId);
	}

	updateSelectedStudent(updatedStudentId) {
		const grid = this.template.querySelector("c-responsive-datatable");
		const gallery = this.template.querySelector("c-student-tiles");
		if (gallery) {
		}
		if (grid) {
		}
		publish(this.info, SELECTED_STUDENT_CHANNEL, { studentId: updatedStudentId });
	}

	handleRowDblClick(event) {
		const studentId = event.detail.pk;
		this[NavigationMixin.Navigate]({
			type: "standard__recordPage",
			attributes: {
				recordId: studentId,
				objectApiName: "Contact",
				actionName: "edit"
			}
		});
	}

	handleRowClick(event) {
		const studentId = event.detail.pk;
		this.updateSelectedStudent(studentId);
	}
}
