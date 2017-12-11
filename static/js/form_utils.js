var ans_form_validation_rules = {
    rules: {
       name: 'required',
       anrede: 'required',
       email: {
            required: true,
            email: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
       },
       telefon: {
            required: true,
            pattern: /[0-9]*(\+49)*[ ]*(\([0-9]+\))*([ ]*(-|–)*[ ]*[0-9]+)*/

       }
    },
    messages: {
        name: 'Name muss angegeben werden!',
        anrede: 'Anrede muss angegeben werden',
        email: {
            required: 'Eine Emailadresse muss angegeben werden',
            email: 'Es muss eine gültige Adresse angegeben werden',
            pattern: 'Es muss eine gültige Adresse angegeben werden'
        },
        telefon: {
            required: 'Eine Telefonnummer muss angegeben werden',
            pattern: 'Ungültiges Format'
        }
    }
};
var firm_form_validation_rules = {
    rules: {
        name: 'required',
        strasse_hnr: 'required',
        plz: 'required',
        ort: 'required',
        website: 'required',
        erfassungsdatum: 'required',
        land: {
            required: true,
            pattern: /(DE|CH|AT)/
        },
        branche: 'required'
    },
    messages: {
        name: 'Name muss angegeben werden',
        strasse_hnr: 'Eine Adresse muss angegeben werden',
        plz: 'Eine Postleitzahl muss angegeben werden',
        ort: 'Ein Ort muss angegeben werden',
        website: 'Eine Website muss angegeben werden',
        erfassungsdatum: 'Erfassungsdatum ist pflicht',
        land: {
            required: "Ein Land muss angegeben werden",
            pattern: "Kein gültiges Format"
        },
        branche: 'Die Branche muss angegeben werden'
    }
};
function parse_firm_obj_from_form(){
    var firm_obj = {};
    var validation_flag = true;
    var ansprechpartner_list = [];
    $("form#firm_form").validate(firm_form_validation_rules);
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
                $(this).hide();
            }
        }
    });
}
function enable_ansprechpartner_form(){
    $('.ansprechpartner_form').each(function(index, form) {
        if($(this).hasClass('checked')){
            for(var i=0; i<form.length; i++){
                $(this).show();
            }
        }
    });
}
function enable_disable_ans_form_1(){
    if ($(this).is(':checked')) {
        $('form#ansprechpartner_form_1').removeClass('disabled').addClass('checked');
        enable_ansprechpartner_form();
        $('html, body').animate({
              scrollTop: $('form#ansprechpartner_form_1').offset().top - $('html, body').offset().top + $('html, body').scrollTop()
         }, 1500);
    }else{
        $('form#ansprechpartner_form_1').removeClass('checked').addClass('disabled');
        disable_ansprechpartner_form();
    }
}
function enable_disable_ans_form_2(){
    if ($(this).is(':checked')) {
        $('form#ansprechpartner_form_2').removeClass('disabled').addClass('checked');
        enable_ansprechpartner_form();
        $('html, body').animate({
              scrollTop: $('form#ansprechpartner_form_2').offset().top - $('html, body').offset().top + $('html, body').scrollTop()
         }, 1500);
    }else{
        $('form#ansprechpartner_form_2').removeClass('checked').addClass('disabled');
        disable_ansprechpartner_form();
    }
}