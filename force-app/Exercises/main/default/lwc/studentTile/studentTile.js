import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api isSelected = false;
    @api student ={
        Name:'Santhosh',
        PhotoUrl: '/services/images/photo/0031100001s2MjwAAE'
    };

    get tileSelected(){
        console.log(this.isSelected);
        return this.isSelected ? 'tile selected' : 'tile';
    }

    studentClick(){
       debugger;
       console.log(this.student.name);
    }
}