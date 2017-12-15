//listeners for form checkbox activators
$('input:checkbox#ansprechpartner1_checkbox').change(enableOrDisableAnsprechpartnerForm);
$('input:checkbox#ansprechpartner2_checkbox').change(enableOrDisableAnsprechpartnerForm);
/*
* Anonymous self calling function which populates the branches list in both
* forms
*/
(function(){
  $.get( "/branch", function( branches ) { //populate select branches list
      var container = "";
      $.each(branches.branches, function(index, branch){
          container += "<option>"+branch+"</option>";
      });
      $('select#branch_select').append(container);
  });
})();

function checkIfChanged(submit_btn,cancel_btn){
    var form_inputs_obj = {},
        new_form_inputs_obj = {},
        onclick_no_changes = 'window.location.href="/"',
        onclick_changes = 'if(!confirm("Möchten Sie wirklich abbrechen?"))return false;else{window.location.replace("/")}',
        $firm_form = $('#firm_form'),
        $ans_form = $('.ansprechpartner_form');
    $firm_form.each(function(){
        var $form = $(this);
        for(var i=0; i<$form[0].length; i++){
         $($form[0][i]).on('change',inputListener);
         if(!$($form[0][i]).hasClass('tt-hint')){
            if($form[0][i].type != 'select-one'){
                index = i-1;
                form_inputs_obj[$form[0][i].name+index] = $form[0][i].value;
            }
         }
        }
    })
    $ans_form.each(function(ans_form_index){
        var $form = $(this);
           for(var i=0,j=0; i<$form[0].length; i++,j++){
             $($form[0][i]).on('change',inputListener);
             if($form[0][i].type != "radio"){
                if($($form[0][i]).hasClass('tt-hint')){
                    j--;
                }else{
                    form_inputs_obj[$form[0][i].name+j+'ans'+ans_form_index] = $form[0][i].value;
                }
             }
           }
    })
    function inputListener(){
       $firm_form.each(function(){
          var $form = $(this),
               index = 0;
          for(var i=0; i<$form[0].length; i++){
            if(!$($form[0][i]).hasClass('tt-hint')){
                if($form[0][i].type != 'select-one'){
                    index = i-1;
                    new_form_inputs_obj[$form[0][i].name+index] = $form[0][i].value;
                }
            }
          }
       })
       $ans_form.each(function(ans_form_index){
           var $form = $(this);
              for(var i=0,j=0; i<$form[0].length; i++,j++){
                if($form[0][i].type != "radio"){
                    if($($form[0][i]).hasClass('tt-hint')){
                        j--;
                    }else{
                        new_form_inputs_obj[$form[0][i].name+j+'ans'+ans_form_index] = $form[0][i].value;
                    }
                }
              }
       })
       if(JSON.stringify(form_inputs_obj) === JSON.stringify(new_form_inputs_obj)){
            submit_btn.prop('disabled',true);
            cancel_btn.attr('onclick',onclick_no_changes);
       }else{
            submit_btn.removeAttr('disabled');
            cancel_btn.attr('onclick',onclick_changes);
       }
    }
};

/*
* Loop through all ansprechpartner forms and hide the form if it has been marked as disabled
*/
function disableAnsprechpartnerForm(){
    $('.ansprechpartner_form').each(function(index, form) {
        if($(this).hasClass('disabled')){
            for(var i=0; i<form.length; i++){
                $(this).hide();
            }
        }
    });
}
/*
* Loop through all ansprechpartner forms and show the form if it has been marked as checked
*/
function enableAnsprechpartnerForm(){
    $('.ansprechpartner_form').each(function(index, form) {
        if($(this).hasClass('checked')){
            for(var i=0; i<form.length; i++){
                $(this).show();
            }
        }
    });
}
/*
* Enable or disable ansprechpartner form depending on checkbox id
*/
function enableOrDisableAnsprechpartnerForm(){
    var $checkbox = $(this),
         checkbox_id = $checkbox.data('id'),
         $ans_form = $('form#ansprechpartner_form_'+checkbox_id),
         $dom_html_body = $('html, body');
    if ($checkbox.is(':checked')) {
        $ans_form.removeClass('disabled').addClass('checked');
        enableAnsprechpartnerForm();
        $dom_html_body.animate({ // smooth animation to show new form
              scrollTop: $ans_form.offset().top - $dom_html_body.offset().top + $dom_html_body.scrollTop()
         }, 1000);
    }else{
        $ans_form.removeClass('checked').addClass('disabled');
        disableAnsprechpartnerForm();
        $('#ans_form_remove_confirm').show().fadeOut(2500);
    }
}
