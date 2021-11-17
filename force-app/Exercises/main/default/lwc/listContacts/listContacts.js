import { LightningElement, wire } from 'lwc';
import getContactFetch from '@salesforce/apex/ContactResults.getContactFetch';

export default class ListContacts extends LightningElement {

    @wire(getContactFetch) contacts;
}