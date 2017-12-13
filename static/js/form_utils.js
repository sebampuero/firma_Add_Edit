
/*
* Loop through all ansprechpartner forms and hide the form if it has been marked as disabled
*/
function disable_ansprechpartner_form(){
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
function enable_ansprechpartner_form(){
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
function enable_disable_ans_form(){
    var $checkbox = $(this),
         checkbox_id = $checkbox.data('id'),
         $ans_form = $('form#ansprechpartner_form_'+checkbox_id),
         $dom_html_body = $('html, body');
    if ($checkbox.is(':checked')) {
        $ans_form.removeClass('disabled').addClass('checked');
        enable_ansprechpartner_form();
        $dom_html_body.animate({ // smooth animation to show new form
              scrollTop: $ans_form.offset().top - $dom_html_body.offset().top + $dom_html_body.scrollTop()
         }, 1500);
    }else{
        $ans_form.removeClass('checked').addClass('disabled');
        disable_ansprechpartner_form();
        $('#ans_form_remove_confirm').show().fadeOut(2000);
    }
}



