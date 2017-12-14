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
         }, 1500);
    }else{
        $ans_form.removeClass('checked').addClass('disabled');
        disableAnsprechpartnerForm();
        $('#ans_form_remove_confirm').show().fadeOut(2000);
    }
}
