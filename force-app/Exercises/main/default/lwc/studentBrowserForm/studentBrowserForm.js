import {
    LightningElement,
    wire
} from 'lwc';
import getInstructors from "@salesforce/apex/studentBrowserForm.getInstructors";
import getDeliveryInstructorId from "@salesforce/apex/studentBrowserForm.getDeliveryInstructorId";
import {NavigationMixin} from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
export default class StudentBrowserForm extends NavigationMixin(LightningElement) {
    selectedInstructorId = '';
    selectedDeliveryId = '';
    instructors = [];
    deliveries = [];
    error;

    @wire(getInstructors) wiredInstructors({error,data}) {
        this.instructors = [];
        if (data) {
            this.instructors.push({
                value: '',
                label: 'select an instructor'
            });
            data.forEach(instructor => {
                this.instructors.push({
                    value:instructor.Id,
                    label:instructor.Name
                });
            })
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getDeliveryInstructorId,{instructorId:'$selectedInstructorId'}) wired_getDeliveriesByInstructor({ error, data }) {
        this.deliveries = [];
        if (data && data.length) {
            
            this.deliveries = data.map(delivery => ({
                value: delivery.Id,
                label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attendee_Count__c} students`
            }));
    
            this.deliveries.unshift({
                value: '',
                label: 'Any Delivery' 
            });
    
        } else if (error) {
            this.error = error;
        }
    }
    onInstructorChange(event){
        this.selectedInstructorId = event.target.value;
        this.notifyParent();
    }
    onDeliveryChange(event){
        this.selectedDeliveryId = event.target.value
        this.notifyParent();
    }

    createNewDelivery() {
        const defaultValues = encodeDefaultFieldValues({
            Instructor__c: this.selectedInstructorId
        });

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Course_Delivery__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }


    //custom event to pass child to parent 
    notifyParent(){
        const evt = new CustomEvent('filterchange',{
        detail:{
            instructorId: this.selectedInstructorId,
            deliveryId: this.selectedDeliveryId
        }
    });

    this.dispatchEvent(evt);
    }
}