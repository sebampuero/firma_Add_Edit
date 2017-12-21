FormUtils = {}
FormUtils = (function(){

  /*
  * Module responsible for populating selects and disabling or enabling forms
  */
  var $firm_form = $('#firm_form'),
      $ans_form = $('.ansprechpartner_form');

  /*
  * Populates the select input with available branches
  */
  function listBranches(){
    $.get( "/branch", function( branches ) { //populate select branches list
        var container = "";
        $.each(branches.branches, function( index, branch ){
            container += "<option>"+branch+"</option>";
        });
        $('select#branch_select').append( container );
    });
  };

  /*
  * Loop through all ansprechpartner forms and hide the form if it has been marked as disabled
  */
  function disableAnsprechpartnerForm(){
      $ans_form.each(function( index, form ) {
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
      $ans_form.each(function( index, form ) {
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
           $the_ans_form = $('form#ansprechpartner_form_'+checkbox_id),
           $dom_html_body = $('html, body');
      if ($checkbox.is(':checked')) {
          $the_ans_form.removeClass('disabled').addClass('checked');
          enableAnsprechpartnerForm();
          FormChangesUtils.addAnsObjectFromCheckbox(checkbox_id);
          $dom_html_body.animate({ // smooth animation to show new form
                scrollTop: $the_ans_form.offset().top - $dom_html_body.offset().top + $dom_html_body.scrollTop()
           }, 1000);
      }else{
          $the_ans_form.removeClass('checked').addClass('disabled');
          disableAnsprechpartnerForm();
          FormChangesUtils.removeAnsObject();
          FormChangesUtils.editCancelSubmitButton();
          $('#ans_form_remove_confirm').show().fadeOut(5500);
      }
  }

  //listeners for form checkbox activators
  $('input:checkbox#ansprechpartner1_checkbox').change( enableOrDisableAnsprechpartnerForm );
  $('input:checkbox#ansprechpartner2_checkbox').change( enableOrDisableAnsprechpartnerForm );

  return {
    listBranches: listBranches,
    disableAnsprechpartnerForm: disableAnsprechpartnerForm,
    enableAnsprechpartnerForm: enableAnsprechpartnerForm
  }
})();
