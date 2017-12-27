$(function(){
    var firms_list = [], //array for firms
        is_first_time = true;
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
        $select_firm_name.append( container );
    });
     // when a firm gets selected
    $('select#firm_name').on('change', function (e) {
        // clean firm forms
        if( is_first_time ){
           FormUtils.appendFirmForm();
           FormUtils.listBranches();
           is_first_time = false;
        }
        $('#firm_form')[0].reset();
       $.each($('input.checkbox_ansprechpartner'),function(){
           var $checkbox = $(this);
           $checkbox.removeAttr("disabled");
           $checkbox.prop('checked',false);
       });
       // remove ansprechpartner forms
       FormUtils.removeAllAnsForms();
       $('button#submit').prop('disabled',true);
       // get the index of the firm in the firms_list array
       var value_selected = this.value;
       $.each(firms_list,function(index,firm){
           if(index == value_selected){
               for(var i=0; i<firm.ansprechpartner.length; i++){
                 FormUtils.appendAnsForm();
                 $($('.ansprechpartner_form')[i]).populate(firm.ansprechpartner[i]);
                 if(i>=1){
                   $('input.checkbox_ansprechpartner')[i-1].checked = true; // check corresponding check boxes
                 }
               }
               var temp_firm = jQuery.extend({}, firm);
               delete temp_firm.ansprechpartner; // delete the ansprechpartner list because the firm forms has no ansprechpartner inputs
               $('#firm_form').populate(temp_firm);
             }
           });
           FormChangesUtils.checkForChanges();
         });

    $('button#submit').on('click',function(){
       var result = FormObjectParser.parseFirmObject(),
           $loading_anim = $('#loading_spinner').show();
       if( result.flag ){
           $.ajax({
               type: "PUT",
               url: "/edit",
               data: JSON.stringify(result.firm_obj),
               contentType: 'application/json',
               dataType: 'json'
           }).always(function( status ){
               if(status == 204)
                   window.location.replace("/?edit="+result.firm_obj.name);
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
