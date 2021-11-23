public with sharing class AwNavigation {
    
   @AuraEnabled(cacheable=true)
   public static list<Certification__c> getCertification(){
      return [SELECT Id, Name, Number_of_Certified_Professionals__c FROM Certification__c with security_enforced order by name ];
   }
}
