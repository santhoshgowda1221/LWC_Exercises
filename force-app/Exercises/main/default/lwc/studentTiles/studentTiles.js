import { LightningElement, api } from 'lwc';

export default class StudentTiles extends LightningElement {
    @api studentList =[];
    selectedStudent ='';
    handleStudentSelected(event){
        this.selectedStudent = event.detail.studentId;
    }
}