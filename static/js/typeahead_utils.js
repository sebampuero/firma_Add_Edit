
var firm_names = new Bloodhound({
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    remote: {
        url: '/firms?query=%QUERY',
        wildcard: '%QUERY'
    }
});

var titles = new Bloodhound({
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('titel'),
    remote: {
        url: '/titles?query=%QUERY',
        wildcard: '%QUERY'
    }
});

//Select the Bloodhound object and display the data
$('input#typeahead').typeahead(null,{
    name: 'name',
    display: 'name',
    source: firm_names,
    hint: true,
    highlight: true,
    minLength: 2,
    limit: 20
});

//Select the Bloodhound object and display the data
$('input.typeahead_title').typeahead(null,{
    name: 'titel',
    display: 'titel',
    source: titles,
    hint: true,
    highlight: true,
    minLength: 2,
    limit: 20
});