import { LightningElement, wire} from 'lwc';
import getAccounts from '@salesforce/apex/getRecordDataController.getAccounts';

export default class GetDataDisplayData extends LightningElement {
     //Method 2
     @wire (getAccounts) wiredAccounts({data,error}){
          if (data) {
          console.log(data); 
          } else if (error) {
          console.log(error);
          }
     }
}