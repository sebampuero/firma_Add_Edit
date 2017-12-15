/*
* Create and populate a firm object using the input fields in the forms. This method loops through both the
* firm form and ansprechpartner forms(depending on if the form is 'visible', if it is not visible then it is not
* taken into account)
* @return an object containing the firm object and a validation flag which indicates if all forms passed the validation
* rules
*/
function parseFirmObject(){
    var firm_obj = {},
        validation_flag = true,
        ansprechpartner_list = [], // this list contains ansprechpartner objects. Every anspr form is an object
        $firm_form = $("form#firm_form"),
        telefon_input = "",
        telefon_list = [];
    $firm_form.validate(firm_form_validation_rules);
    if(!$firm_form.valid()){
        validation_flag = false;
    }
    $.each($firm_form.serializeArray(),function(index,element){
        firm_obj[element.name] = element.value;
    });
    firm_obj['erfassungsdatum'] = getTodayDate();
    $('.ansprechpartner_form').each(function(index, ans_form) { //get all ansprechpartner forms
        var ans_obj = {}
        if($(this).hasClass('checked')){ //if this form is visible
            $(this).validate(ans_form_validation_rules);
            if(!$(this).valid()){ //if the form is invalid, exit and return validation_flag = false
                validation_flag = false;
                return;
            }
            $.each(ans_form,function(i,data){ // loop through each input element and populate the ansprechpartner_list
                if(ans_form[i].type == "radio" && ans_form[i].checked){ // filter special inputs such as radio
                    ans_obj[ans_form[i].name] = ans_form[i].value;
                }else if(ans_form[i].type != "radio"){
                    if(ans_form[i].name == "telefon[]"){
                        telefon_input = ans_form[i].value.trim().replace(/ +/g, "");
                        telefon_list = telefon_input.split(',');
                        ans_obj[ans_form[i].name] = telefon_list;
                    }else{
                        ans_obj[ans_form[i].name] = form[i].value;
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
