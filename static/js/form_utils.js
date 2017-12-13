/*
* Functions for forms in the create and edit view.
* @author Sebastian Ampuero
* @date 05.12.2017
*/


/*
* Create and populate a firm object using the input fields in the forms. This method loops through both the
* firm form and ansprechpartner forms(depending on if the form is 'visible', if it is not visible then it is not
* taken into account)
* @return an object containing the firm object and a validation flag which indicates if all forms passed the validation
* rules
*/
function parse_firm_obj_from_form(){
    var firm_obj = {},
        validation_flag = true,
        ansprechpartner_list = [], // this list contains ansprechpartner objects. Every anspr form is an object
        $firm_form = $("form#firm_form");
    $firm_form.validate(firm_form_validation_rules);
    if(!$firm_form.valid()){
        validation_flag = false;
    }
    $.each($firm_form.serializeArray(),function(index,element){
        firm_obj[element.name] = element.value;
    });
    $('.ansprechpartner_form').each(function(index, form) { //get all ansprechpartner forms
        var ans_obj = {}
        if($(this).hasClass('checked')){ //if this form is visible
            $(this).validate(ans_form_validation_rules);
            if(!$(this).valid()){ //if the form is invalid, exit and return validation_flag = false
                validation_flag = false;
                return;
            }
            $.each(form,function(i,data){ // loop through each input element and populate the ansprechpartner_list
                if(form[i].type == "radio" && form[i].checked){ // filter special inputs such as radio
                    ans_obj[form[i].name] = form[i].value;
                }else if(form[i].type != "radio"){
                    if(form[i].name == "telefon[]"){
                        var telefon_list = form[i].value.split(',');
                        ans_obj[form[i].name] = telefon_list;
                    }else{
                        ans_obj[form[i].name] = form[i].value;
                    }
                }
            });
            ansprechpartner_list.push(ans_obj);
        }
    });
    firm_obj['ansprechpartner'] = ansprechpartner_list;
    if(!validation_flag)
        return {flag:validation_flag};
    return {flag: validation_flag, firm_obj: firm_obj};
}
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
/*
* Self calling anonymous function for the input type date in the firm form. This is done in order to prevent future
* dates in the 'erfassungsdatum' input.
*/
(function(){
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('input[type="date"]').attr('max', maxDate);
})();


