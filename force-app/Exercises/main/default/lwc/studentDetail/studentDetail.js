import { LightningElement, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import {publish, MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import Utils from 'c/utils';
// TODO #2: import the getRecord, getFieldValue, and getFieldDisplayValue functions from lightning/uiRecordApi.

// TODO #3: We've imported the name field and placed it into an array for you.

//  To prepare for Lab 1, import the Description, Email, and Phone fields and add them to the array.

import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Description from '@salesforce/schema/Contact.Description';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';
import FIELD_Email from '@salesforce/schema/Contact.Email';


const fields = [FIELD_Name,FIELD_Description,FIELD_Phone,FIELD_Email];

export default class StudentDetail extends NavigationMixin(LightningElement) {

	// TODO #4: locate a valid Contact ID in your scratch org and store it in the studentId property.
	// Example: studentId = '003S000001SBAXEIA5';
	studentId;
    subscription;

	//TODO #5: use wire service to call getRecord, passing in our studentId and array of fields.
	//		   Store the result in a property named wiredStudent.
	@wire(getRecord, { recordId:'$studentId', fields }) wiredStudent;
    @wire(MessageContext) info;

    connectedCallback(){
        if(this.subscription){
            return;
        }this.subscription = subscribe(this.info, SELECTED_STUDENT_CHANNEL, (message)=>{
            this.handleStudentSelected(message);
        } );
        }
        handleStudentSelected(message){
            this.studentId = message.studentId;
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;

    }
		
	get name() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}
    get Description() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Description);
	}
    get Phone() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Phone);
	}
    get Email() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Email);
	}

	//TODO #6: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.
	
	//TODO #7: Review the errorMessages getter, the cardTitle getter, and the _getDisplayValue function below.

	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}
	
	// _getDisplayValue(data, field) {
	// 	return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	// }
	
    handleButton(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.studentId,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }
}