FormUtils = {}
FormUtils = (function(){

  /*
  * Utils responsible for showing and hiding ansprechpartner forms and checking for
  * changes in the forms.
  */

  var form_inputs_obj = {}, // initial form object containing initial values
      new_form_inputs_obj = {}, // form object which is dynamically changed and compared against form_inputs_obj to check for changes
      $firm_form = $('#firm_form'),
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
  * First calling function to check for changes in the forms
  */
  function checkForChanges(){
    $firm_form.each(function(){
        var $form = $(this);
        for(var i=0; i<$form[0].length; i++){
         $($form[0][i]).change( inputListener );
            if($form[0][i].type != 'select-one'){
                form_inputs_obj[$form[0][i].name] = $form[0][i].value;
            }
        }
    })

    $ans_form.each(function( ans_form_index ){
        var $form = $(this);
        if( $form.hasClass('checked') ){
          insertAnsObject($form, ans_form_index);
        }
    })
  }

  /*
  * Insert a new ansprechpartner object in the firm object
  * @param $form the ansprechpartner form to be scanned
  * @param ans_form_index the index of the ans form object to be inserted
  */
  function insertAnsObject($form, ans_form_index){
    var ans_obj = {};
    for(var i=0; i<$form[0].length; i++){
        $($form[0][i]).change( inputListener );
        if($form[0][i].type != "radio"){
            ans_obj[$form[0][i].name] = $form[0][i].value;
        }else{
            ans_obj[$form[0][i].name] = $form[0][i].checked;
        }
    }
    form_inputs_obj['ans_obj'+ans_form_index] = ans_obj;
  }

  /*
  * Add an ansprechpartner object in the firm object when a ansprechpartner form
  * is added via a checkbox click
  * @param initialIndex the index which indicates the ansprechpartner form
  * that has to be added
  */
  function addAnsObjectFromCheckbox(initialIndex){
    $ans_form.each(function( ans_form_index ){
        var $form = $(this);
        if( $form.hasClass('checked') && initialIndex == ans_form_index ){
          insertAnsObject($form, ans_form_index);
        }
    })
  }

  /*
  * Removes an ansprechpartner form object from the initial objects when an
  * ansprechpartner form is hidden by a checkbox
  */
  function removeAnsObject(){
    $ans_form.each(function( ans_form_index ){
        var $form = $(this);
            if($form.hasClass('disabled')){
              for(var i=0; i<$form[0].length; i++){
               $($form[0][i]).off();
               }
               delete form_inputs_obj['ans_obj'+ans_form_index];
               delete new_form_inputs_obj['ans_obj'+ans_form_index];
            }
    })
  }

  /*
  * Compares if both form objects are equal in order to know if there are onclick_changes
  * return true if both objects are equal, false otherwise
  */
  function areObjectsEqual(){
    return  JSON.stringify( form_inputs_obj ) === JSON.stringify( new_form_inputs_obj );
  }

  /*
  * Depending on the changed state of the forms, both the submit and cancel buttons
  * are edited.
  */
  function editCancelSubmitButton(){
    var onclick_changes = (areObjectsEqual() || $.isEmptyObject(new_form_inputs_obj)) ?
      'window.location.href="/"' : 'if(!confirm("Möchten Sie wirklich abbrechen? Geänderte Daten gehen veloren"))'
      +'return false;else{window.location.replace("/")}';
    $('button#cancel_submit').attr( 'onclick', onclick_changes );
    if( areObjectsEqual() || $.isEmptyObject(new_form_inputs_obj) ){
      $('button#submit').prop('disabled',true);
    }else{
      $('button#submit').prop('disabled',false);
    }
  }

  /*
  * The listener for the input fields in the forms. This updates a firm object,
  * which is used to be compared another firm object to see if there are changes
  * on the forms
  */
  function inputListener(e){
    $firm_form.each(function(){
      var $form = $(this);
      for(var i=0; i<$form[0].length; i++){
        if($form[0][i].type != 'select-one'){
            new_form_inputs_obj[$form[0][i].name] = $form[0][i].value;
        }
      }
   })
   $ans_form.each(function( ans_form_index ){
       var $form = $(this);
       if($form.hasClass('checked')){
         var ans_obj = {};
         for(var i=0; i<$form[0].length; i++){
            if($form[0][i].type != "radio"){
                ans_obj[$form[0][i].name] = $form[0][i].value;
            }else{
                ans_obj[$form[0][i].name] = $form[0][i].checked;
            }
        }
        new_form_inputs_obj['ans_obj'+ans_form_index] = ans_obj;
       }
      editCancelSubmitButton();
  })
 }

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
          addAnsObjectFromCheckbox(checkbox_id);
          $dom_html_body.animate({ // smooth animation to show new form
                scrollTop: $the_ans_form.offset().top - $dom_html_body.offset().top + $dom_html_body.scrollTop()
           }, 1000);
      }else{
          $the_ans_form.removeClass('checked').addClass('disabled');
          disableAnsprechpartnerForm();
          removeAnsObject();
          editCancelSubmitButton();
          $('#ans_form_remove_confirm').show().fadeOut(4500);
      }
  }

  //listeners for form checkbox activators
  $('input:checkbox#ansprechpartner1_checkbox').change( enableOrDisableAnsprechpartnerForm );
  $('input:checkbox#ansprechpartner2_checkbox').change( enableOrDisableAnsprechpartnerForm );

  return {
    listBranches: listBranches,
    checkForChanges: checkForChanges,
    disableAnsprechpartnerForm: disableAnsprechpartnerForm,
    enableAnsprechpartnerForm: enableAnsprechpartnerForm
  }
})();
