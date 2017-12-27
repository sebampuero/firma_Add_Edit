$(function(){
    var firm_name_exists = false,
        branches_container = FormUtils.listBranches();
    FormUtils.appendAnsForm();
    FormUtils.appendFirmForm();
    $('#branch_select').append(branches_container);
    FormChangesUtils.checkForChanges();

     //listener for firm name input to check if the given firm already exists
     $('input#name-autocomplete').change(function(){
       var input_text = $(this).val(),
           $error_label = $('label#firm_name_error_label');
       if(input_text != ""){
            $.get( "/firms?query="+input_text, function( firm ) {
                if(firm.length==1){
                    if(input_text.toLowerCase() == firm[0].name.toLowerCase()){
                        $error_label.show();
                        firm_name_exists = true;
                    }else{
                        $error_label.hide();
                        firm_name_exists = false;
                    }
                }else{
                    $error_label.hide();
                    firm_name_exists = false;
                }
            });
       }else{
            $error_label.hide();
            firm_name_exists = false;
       }
    });

    $('button#submit').on('click',function(){
        var result = FormObjectParser.parseFirmObject(), // result contains the firm obj and validation flag
            $loading_anim = $('#loading_spinner').show();
        if( result.flag && !firm_name_exists){
            $.ajax({
               type: "POST",
                url: "/create",
                data: JSON.stringify(result.firm_obj),
                contentType: 'application/json',
                dataType: 'json'
            }).always(function( status ){
                if(status == 201)
                    window.location.replace("/?create="+result.firm_obj.name);
                else if(status == 500){
                  $('#server_error_modal').modal('show');
                  $loading_anim.hide();
                }

            });
        }else{
            $('#invalid_input_modal').modal('show');
            $loading_anim.hide();
        }
    });
});
