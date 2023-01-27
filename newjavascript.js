/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* global School, Student, localStroage, DB, Rel */

var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl';
var jpdbIML='/api/iml';
var schoolDBName="School-DB";
var studentRelationName="Student-Rel";
var connToken='90932292|-31949271172527169|90954088';
$('#rollno').focus();

function saveRecNo2LS(jsonObj){
    var lvdata=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvdata.rec_no);
}
function getRollnoAsJsonObj(){
    var rollno=$('rollno').val();
    var jsonStr={
        no:rollno
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNO2LS(jsonObj);
    var record =JSON.parse(jsonObj.data).record;
         $('#name').val(record.name);
          $('#stdclass').val(record.stdclass);
           $('#birthdate').val(record.birthdate);
           $('#address').val(record.address);
            $('#enrollno').val(record.enrollno);
}
function resetForm(){
        $('#rollno').val("");
         $('#name').val("");
          $('#stdclass').val("");
           $('#birthdate').val("");
           $('#address').val("");
            $('#enrollno').val("");
             $('#rollno').prop('disabled',false);
             $('#save').prop('disabled',true);
             $('#change').prop('disabled',true);
             $('#reset').prop('disabled',true);
             $('#rollno').focus();
    }
    
    function validateData(){
        var rollno,name,stdclass,birthdate,address,enrollno;
        rollno=$('#rollno').val();
         name=$('#name').val();
          stdclass=$('#stdclass').val();
           birthdate=$('#birthdate').val();
            address=$('#address').val();
             enrollno=$('#enrollno').val();
             
           if(rollno===''){
               alert("Student rollno missing");
               $('#rollno').focus();
               return '';
           }
           if(name===''){
               alert("Student name missing");
               $('#name').focus();
               return '';
           }
           if(stdclass===''){
               alert("Student class missing");
               $('#stdclass').focus();
               return '';
           }
           if(birthdate===''){
               alert("Student birthdate missing");
               $('#birthdate').focus();
               return '';
           }
           if(address===''){
               alert("Student address missing");
               $('#address').focus();
               return '';
           }
           if(enrollno===''){
               alert("Student enrollno missing");
               $('#enrollno').focus();
               return '';
           }
           
     var jsonStrObj={
    rollno:rollno,
    name:name,
    stdclass:stdclass,
    birthdate:birthdate,
    address:address,
    enrollno:enrollno
};
    return JSON.stringify(jsonStrObj);
    }

function getStd(){
    var rollnoJsonObj=getRollnoASJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,School-DB,Student-Rel,rollnoJsonObj);
   jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseURL(getRequest,jpdbBaseURL,jpdbIML);
        jQuery.ajaxSetup({async: true});
     if(resJsonObj.status===400){
         $("#save").prop('disabled',false);
         $("#reset").prop('disabled',false);
         $("stdname").focus();
     }   
     else if(resJsonObj.status===200){
         $('#rollno').prop('disabled',true);
         fillData(resJsonObj);
         
         $('#change').prop('disabled',false);
         $('#reset').prop('disabled',false);
         $('#name').focus();
     }
}


function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj===''){
        return '';
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj, "school-DB", "Student-Rel");
            jQuery.ajaxSetup({async: false});
            var resJsonObj = executeCommandAtGivenBaseURL(putRequest,jpdbBaseURL,jpdbIML);
            jQuery.ajaxSetup({async: true});
            resetForm();
            $('#rollno').focus();
}
function changeData(){
    $('#change').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonChg,School-DB,Student-Rel,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseURL(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#rollno').focus();
}

