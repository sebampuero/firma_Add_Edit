FormUtils = {}
FormUtils = (function(){

  /*
  * Module responsible for populating selects, appending and deleting of forms
  * Date 20.12.2017
  */

  /*
  * Populates the select input with available branches
  */
  function listBranches(){
    $.get( "/branch", function( branches ) { //populate select branches list
        var container = "";
        $.each(branches.branches, function( index, branch ){
            container += "<option>"+branch+"</option>";
        });
        $('select#branch_select').empty();
        $('select#branch_select').append( container );
    });
  };

  /*
  * Appends a new firm form to the container
  */
  function appendFirmForm(){
    var template = $('#firm_form_template').html();
    $('.firm_form_container').append(template);
    initializeAutocomplete();
  }

  /*
  * Appends a new ansprechpartner form to the container
  */
  function appendAnsForm(){
    var template = $('#ansprechpartner_form_template').html();
    $('.ansprechpartner_form_container').append(template);
    initializeAutocomplete();
  }

  /*
  * Removes the last ansprechpartner form from the container
  */
  function removeAnsForm(){
    var $ans_form = $('.ansprechpartner_form');
    $($ans_form[$ans_form.length-1]).remove();
  }

  /*
  * Removes all the ansprechpartner forms from the container
  */
  function removeAllAnsForms(){
    $('.ansprechpartner_form_container').empty();
  }

  /*
  * Enable or disable ansprechpartner form depending on checkbox the checkbox clicked
  */
  function enableOrDisableAnsprechpartnerForm(){
      var $checkbox = $(this),
           $dom_html_body = $('html, body'),
           $ans_form = $('.ansprechpartner_form');
      if ($checkbox.is(':checked')) {
          appendAnsForm();
          FormChangesUtils.addAnsObjectFromCheckbox();
          $dom_html_body.animate({ // smooth animation to show new form
                scrollTop: $($ans_form[$ans_form.length-1]).offset().top - $dom_html_body.offset().top + $dom_html_body.scrollTop()
           }, 1000);
      }else{
          FormChangesUtils.removeAnsObject();
          removeAnsForm();
          FormChangesUtils.editCancelSubmitButton();
          $('#ans_form_remove_confirm').show().fadeOut(5500);
      }
  }

  //listeners for form checkbox activators
  $('input:checkbox#ansprechpartner1_checkbox').change( enableOrDisableAnsprechpartnerForm );
  $('input:checkbox#ansprechpartner2_checkbox').change( enableOrDisableAnsprechpartnerForm );

  return {
    listBranches: listBranches,
    appendAnsForm: appendAnsForm,
    appendFirmForm: appendFirmForm,
    removeAllAnsForms: removeAllAnsForms
  }
})();
