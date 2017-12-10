function parse_firm_obj_from_form(){
    var firm_obj = {};
    var ansprechpartner_list = [];
    $.each($("form#firm_form").serializeArray(),function(index,element){
        firm_obj[element.name] = element.value;
    });
    $('.ansprechpartner_form').each(function(index, form) {
        var ans_obj = {}
        if($(this).hasClass('checked')){
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
    return firm_obj;
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