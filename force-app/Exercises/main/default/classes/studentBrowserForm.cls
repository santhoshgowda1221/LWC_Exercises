public with sharing class studentBrowserForm {


    @AuraEnabled(cacheable=true)
   public static list<user> getInstructors(){
    return [SELECT Id, Name FROM User WHERE Is_Instructor__c = true ORDER BY Name];
   }

   @AuraEnabled(cacheable=true)
   public static list<Course_Delivery__c> getDeliveryInstructorId(string instructorId){
    if (String.isEmpty(instructorId)) {
        return new List<Course_Delivery__c>();
    } else {
        return [
            SELECT Id, Start_Date__c, Location__c, Attendee_Count__c
            FROM Course_Delivery__c
            WHERE Instructor__c = :instructorId AND Status__c IN ('Enrolled','Completed','Delivered','Scheduled')
            ORDER BY Start_Date__c DESC
        ];
    }
   } 
}
