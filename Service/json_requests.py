"""
Module for retrieving objects in json format
@date 8.12.2017
"""
import json
from Entities.Ansprechpartner import Ansprechpartner
from Service.firmen_service import get_firms_by_name, get_all_firms, get_firm_branchs


# Retrieve a firm as json format by name
# @param name the name to query
# @return the firm in json format, if not found null is returned
def get_firms_by_name_json(name):
    firmas = get_firms_by_name(name)
    dict_list = []
    if len(firmas) != 0 and firmas is not None:
        for a_firma in firmas:
            dict_list.append(a_firma.json())
        return json.dumps(dict_list)
    else:
        return "{}"


# Retrieve list of firms in json format
# @return the list of firms
def get_firms_json():
    firms = get_all_firms()
    dict_list = []
    if len(firms) != 0 and firms is not None:
        for a_firma in firms:
            dict_list.append(a_firma.json())
        return json.dumps(dict_list)
    else:
        return "{}"


# Retrive a list of titles in json format
# @param title the title to query
# @return a list of titles in json format
def get_title_json(title):
    titles = Ansprechpartner.title_list
    titles_list = []
    for a_title in titles:
        if title in a_title.lower():
            title_dict = {'titel': a_title}
            titles_list.append(title_dict)
    if len(titles_list) == 0:
        return "{}"
    return json.dumps(titles_list)


# Return the list of branches in json format
# @return the list of branches in json format
def get_branches_json():
    branches = get_firm_branchs()
    branch_dict = {'branches': branches}
    return json.dumps(branch_dict)
