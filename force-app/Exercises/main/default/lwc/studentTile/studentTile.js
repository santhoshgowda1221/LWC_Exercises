import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {

    @api selectedStudentId='';
    @api isSelected = false;
    @api student ={
        Name:'Santhosh',
        PhotoUrl: '/services/images/photo/0031100001s2MjwAAE'
    };

    get tileSelected(){
        console.log(this.isSelected);
        return (this.student.Id === this.selectedStudentId) ? 'tile selected' : 'tile';
    }

    studentClick(){
       const evt = new CustomEvent('studentselected',{
           bubbles:true, composed: true,
           detail:{
               studentId : this.student.Id
           }
       });
       this.dispatchEvent(evt);
    }

    
}