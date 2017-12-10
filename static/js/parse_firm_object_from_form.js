function parse_firm_obj_from_form(){
        $.each(firm_form.serializeArray(),function(index,element){
            firm_obj[element.name] = element.value;
        });
        $('.ansprechpartner_form').each(function(index, form) {
            var ans_obj = {}
            if(form[0].value != ""){
                $.each(form,function(i,data){
                    if(form[i].type == "radio" && form[i].checked){
                        ans_obj[form[i].name] = form[i].value;
                    }else if(form[i].type != "radio"){
                        ans_obj[form[i].name] = form[i].value;
                    }
                });
                ans.push(ans_obj);
            }
        });
        firm_obj['ansprechpartner'] = ans;
        return firm_obj;
    }