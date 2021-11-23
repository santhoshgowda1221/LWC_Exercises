public with sharing class CertifiedStudentList {

    @AuraEnabled(cacheable=true)
  
    public static List<Certification_Held__c>  getCertifiedStudent(Id certificationId) {

        return [select Id, Certified_Professional__r.Name, Certified_Professional__r.Id, Certified_Professional__r.Phone,Certified_Professional__r.Email, Certification__r.Id, Certification__r.Name, Date_Achieved__c from Certification_Held__c Where Certification__r.Id =:certificationId Order By Certified_Professional__r.Name];        

    }
}
