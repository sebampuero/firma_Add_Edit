function parse_firm_obj_from_form(){
    $.each(firm_form.serializeArray(),function(index,element){
        firm_obj[element.name] = element.value;
    });
    $('.ansprechpartner_form').each(function(index, form) {
        var ans_obj = {}
        var flag_counter = 0;
        var i;
        for(i=0; i<form.length; i++){
            if(form[i].value != "" && form[i].required)
                flag_counter++;
        }
        if(flag_counter==3){
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