FormUtils = {}
FormUtils = (function(){
  var form_inputs_obj = {},
      new_form_inputs_obj = {},
      $firm_form = $('#firm_form'),
      $ans_form = $('.ansprechpartner_form');

  function listBranches(){
    $.get( "/branch", function( branches ) { //populate select branches list
        var container = "";
        $.each(branches.branches, function( index, branch ){
            container += "<option>"+branch+"</option>";
        });
        $('select#branch_select').append( container );
    });
  };

  function checkForChanges(initialIndex){
    $firm_form.each(function(){
        var $form = $(this);
        for(var i=0; i<$form[0].length; i++){
         $($form[0][i]).change( inputListener );
            if($form[0][i].type != 'select-one'){
                form_inputs_obj[$form[0][i].name] = $form[0][i].value;
            }
        }
    })
    insertAnsObject(initialIndex);
  }

  function insertAnsObject(initialIndex){
    $ans_form.each(function( ans_form_index ){
        var $form = $(this);
            if( initialIndex == undefined){
              if($form.hasClass('checked')){
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
            }
            else if( ans_form_index == initialIndex ){
              if($form.hasClass('checked')){
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
            }
    })
  }

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

  function areObjectsEqual(){
    return  JSON.stringify( form_inputs_obj ) === JSON.stringify( new_form_inputs_obj );
  }

  function editCancelSubmitButton(){
    var onclick_changes = areObjectsEqual() ? 'window.location.href="/"' : 'if(!confirm("Möchten Sie wirklich abbrechen? Geänderte Daten gehen veloren"))'
    +'return false;else{window.location.replace("/")}';
    $('button#cancel_submit').attr( 'onclick', onclick_changes );
    if( areObjectsEqual() ){
      $('button#submit').prop('disabled',true);
    }else{
      $('button#submit').prop('disabled',false);
    }
  }


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
          insertAnsObject(checkbox_id);
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
