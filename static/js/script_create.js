$(function(){

        $('button#submit_create').on('click',function(){
            var result = parseFirmObject(); // result contains the firm obj and validation flag
            $('#loading_spinner').show();
            if(result.flag){
                $.ajax({
                    type: "POST",
                    url: "/firm/create",
                    data: JSON.stringify(result.firm_obj),
                    contentType: 'application/json',
                    dataType: 'json'
                }).always(function(status){
                    if(status == 200)
                        window.location.replace("/?create="+result.firm_obj.name);
                    else if(status == 500)
                        $('#server_error_modal').modal('show');
                });
            }else{
                $('#invalid_input_modal').modal('show');
                $('#loading_spinner').hide();
            }
        });

        //listener for firm name input to check if the given firm already exists
        $('input#typeahead').change(function(){
           var input_text = $(this).val();
           if(input_text != ""){
                $.get( "/firms?query="+input_text, function( firm ) {
                    if(firm.length==1){
                        if(input_text == firm[0].name){
                            $('button#submit_create').prop('disabled', true);
                            $('label#firm_name_error_label').show();
                        }
                    }else{
                        $('button#submit_create').prop('disabled', false);
                        $('label#firm_name_error_label').hide();
                    }
                });
           }else{
                $('button#submit_create').prop('disabled', false);
                $('label#firm_name_error_label').hide();
           }
        });
    });