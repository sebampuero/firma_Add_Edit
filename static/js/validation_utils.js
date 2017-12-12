$.validator.addMethod("PLZ_Validator", function(value, element) {
    var land = $('select#land_select').val();
    var valid = false;
    switch(land){
        case 'DE':
            if(/(^\d{5}$)/i.test(value)){
                valid = true;
            }break;
        case 'CH':
            if(/(^\d{4}$)/i.test(value)){
                valid = true;
            }break;
        case 'AT':
            if(/(^\d{4}$)|(^\d{4}-\d{4}$)/i.test(value)){
                valid = true;
            }break;
    }
    return this.optional(element) || valid;
});
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
        plz: {
            required: true,
            PLZ_Validator: true
        },
        ort: 'required',
        website: {
            required: true,
            pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
        },
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
        plz: {
            required: 'Eine Postleitzahl muss angegeben werden',
            PLZ_Validator: 'Ungültige Postleitzahl für das gewählte Land'
        },
        ort: 'Ein Ort muss angegeben werden',
        website: {
            required: 'Eine Website muss angegeben werden',
            pattern: 'Es muss eine gültige Adresse angegeben werden'
        },
        erfassungsdatum: 'Erfassungsdatum ist pflicht',
        land: {
            required: "Ein Land muss angegeben werden",
            pattern: "Kein gültiges Format"
        },
        branche: 'Die Branche muss angegeben werden'
    }
};