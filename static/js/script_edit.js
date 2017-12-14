$(function(){
        var firms_list = []; //array for firms

        // this get request returns an array of firms which then are saved in the firms_list array
        // the select is then populated with the corresponding names
        $.get( "/firms", function( firms ) {
            var $select_firm_name = $('select#firm_name'),
                container = "";
            firms_list = Object.assign(firms);
            $select_firm_name.empty();
            $.each(firms,function(index,firm){
                container += "<option value='"+index+"'>"+firm.name+"</option>";
            });
            $select_firm_name.append(container);
        });

        // when a firm gets selected
        $('select#firm_name').on('change', function (e) {
            // cache variables
            var $firm_form = $("form#firm_form"),
                $edit_btn = $('button#submit_edit'),
                $ansprechpartner_form_array = $('.ansprechpartner_form'),
                $checkboxes_array = $('input.checkbox_ansprechpartner');
            // clean all forms
            $firm_form[0].reset();
            $firm_form.show();
            $edit_btn.removeAttr('disabled');
            $.each($checkboxes_array,function(){
                var $checkbox = $(this);
                $checkbox.removeAttr("disabled");
                $checkbox.prop('checked',false);
            });
            $.each($ansprechpartner_form_array,function(){
                var $ans_form = $(this);
                $ans_form.addClass('disabled').removeClass('checked');
                disableAnsprechpartnerForm();
                $ans_form[0].reset();
            });
            // get the index of the firm in the firms_list array
            var value_selected = this.value;
            $.each(firms_list,function(index,firm){
                if(index == value_selected){
                    for(var i=0; i<firm.ansprechpartner.length; i++){
                        // get the list of ansprechpartner objects in the firm object and populate the forms accordingly
                        $($ansprechpartner_form_array[i]).removeClass('disabled').addClass('checked').populate(firm.ansprechpartner[i]);
                        // show the ansprechpartner form
                        enableAnsprechpartnerForm();
                        if(i>=1){
                            // if more than 1 ansprechpartner is shown, check the checkboxes which activate the ansprechpartner
                            // forms
                            $checkboxes_array[i-1].checked = true;
                        }
                    }
                    var temp_firm = jQuery.extend({}, firm);
                    delete temp_firm.ansprechpartner; // delete the ansprechpartner list because the firm forms has no ansprechpartner inputs
                    $firm_form.populate(temp_firm);
                }
            });
        });

        $('button#submit_edit').on('click',function(){
            var result = parseFirmObject();
            $('#loading_spinner').show();
            if(result.flag){
                $.ajax({
                    type: "PUT",
                    url: "/firm/edit",
                    data: JSON.stringify(result.firm_obj),
                    contentType: 'application/json',
                    dataType: 'json'
                }).always(function(data){
                    if(data.status == 200)
                        window.location.replace("/?edit="+result.firm_obj.name);
                    else if(data.status == 500)
                        $('#server_error_modal').modal('show');
                });
            }else{
                $('#invalid_input_modal').modal('show');
                $('#loading_spinner').hide();
            }
        });
    });