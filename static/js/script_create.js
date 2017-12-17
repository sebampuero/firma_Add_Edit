$(function(){
    var firm_name_exists = false;
    FormUtils.listBranches();
    FormUtils.checkForChanges();

     //listener for firm name input to check if the given firm already exists
     $('input#typeahead').focusout(function(){
       var input_text = $(this).val();
       if(input_text != ""){
            $.get( "/firms?query="+input_text, function( firm ) {
                console.log(firm)
                if(firm.length==1){
                    if(input_text.toLowerCase() == firm[0].name.toLowerCase()){
                        $('label#firm_name_error_label').show();
                        firm_name_exists = true;
                    }else{
                        $('label#firm_name_error_label').hide();
                        firm_name_exists = false;
                    }
                }else{
                    $('label#firm_name_error_label').hide();
                    firm_name_exists = false;
                }
            });
       }else{
            $('label#firm_name_error_label').hide();
            firm_name_exists = false;
       }
    });

    $('button#submit').on('click',function(){
        var result = FormObjectParser.parseFirmObject(); // result contains the firm obj and validation flag
        $('#loading_spinner').show();
        if( result.flag && !firm_name_exists){
            $.ajax({
               type: "POST",
                url: "/firm/create",
                data: JSON.stringify(result.firm_obj),
                contentType: 'application/json',
                dataType: 'json'
            }).always(function( status ){
                if(status == 200)
                    window.location.replace("/?create="+result.firm_obj.name);
                else if(status == 500)
                    $('#server_error_modal').modal('show');
                    $('#loading_spinner').hide();
            });
        }else{
            $('#invalid_input_modal').modal('show');
            $('#loading_spinner').hide();
        }
    });
});
