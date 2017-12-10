var ans_form_validation_rules = {
    rules: {
       name: 'required',
       anrede: 'required',
       email: {
            required: true,
            email: true
       },
       telefon: 'required'
    },
    messages: {
        name: 'Name muss angegeben werden!',
        anrede: 'Anrede muss angegeben werden',
        email: {
            required: 'Eine Emailadresse muss angegeben werden',
            email: 'Es muss eine gültige Adresse angegeben werden'
        },
        telefon: 'Telefon ist Pflicht'
    }
};
var firm_form_validation_rules = {};
function parse_firm_obj_from_form(){
    var firm_obj = {};
    var validation_flag = true;
    var ansprechpartner_list = [];
    $("form#firm_form").validate();
    if(!$("form#firm_form").valid()){
        validation_flag = false;
        return {flag: validation_flag};
    }
    $.each($("form#firm_form").serializeArray(),function(index,element){
        firm_obj[element.name] = element.value;
    });
    $('.ansprechpartner_form').each(function(index, form) {
        var ans_obj = {}
        if($(this).hasClass('checked')){
            $(this).validate(ans_form_validation_rules);
            if(!$(this).valid()){
                validation_flag = false;
                return;
            }
            $.each(form,function(i,data){
                if(form[i].type == "radio" && form[i].checked){
                    ans_obj[form[i].name] = form[i].value;
                }else if(form[i].type != "radio"){
                    ans_obj[form[i].name] = form[i].value;
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
function disable_ansprechpartner_form(){
    $('.ansprechpartner_form').each(function(index, form) {
        if($(this).hasClass('disabled')){
            for(var i=0; i<form.length; i++){
                form[i].readOnly = true;
            }
        }
    });
}
function enable_ansprechpartner_form(){
    $('.ansprechpartner_form').each(function(index, form) {
        if($(this).hasClass('checked')){
            for(var i=0; i<form.length; i++){
                form[i].readOnly = false;
            }
        }
    });
}