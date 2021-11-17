public with sharing class ContactResults {


    @AuraEnabled(cacheable=true)
    public static list<contact> getContactFetch() {
     return [SELECT Id, Name FROM Contact Limit 10];
    }
}
