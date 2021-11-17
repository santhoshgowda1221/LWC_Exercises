import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
export default class StudentBrowser extends LightningElement {

    @wire(getStudents,{instructorId:'', courseDeliveryId:''}) students;
    //can write logic here for error and data
   // @wire(getStudents,{instructorId:'', courseDeliveryId:''}) students({error , data}){};

}