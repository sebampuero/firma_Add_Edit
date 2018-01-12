"""
Module for retrieving objects in json format
@date 8.12.2017
"""
import json
from Entities.Ansprechpartner import Ansprechpartner
from Service.firmen_service import get_firms_by_name, get_all_firms, get_firm_branchs


def get_firms_by_name_json(name):
    """
    Retrieve a firm by name in JSON format
    :param name: the name query
    :return: a list of firms matching the given name query
    """
    firmas = get_firms_by_name(name)
    dict_list = []
    if len(firmas) != 0 and firmas is not None:
        for a_firma in firmas:
            dict_list.append(a_firma.json())
        return json.dumps(dict_list)
    else:
        return "{}"


def get_firms_json():
    """
    Retrieve the whole list of firms in JSON format
    :return: the list of firms
    """
    firms = get_all_firms()
    dict_list = []
    if len(firms) != 0 and firms is not None:
        for a_firma in firms:
            dict_list.append(a_firma.json())
        return json.dumps(dict_list)
    else:
        return "{}"


def get_title_json(title):
    """
    Retrieve a list of titles in JSON format depending on the query
    :param title: the title query
    :return: the list of titles in JSON format
    """
    titles = Ansprechpartner.title_list
    titles_list = []
    for a_title in titles:
        if title in a_title.lower():
            title_dict = {'titel': a_title}
            titles_list.append(title_dict)
    if len(titles_list) == 0:
        return "{}"
    return json.dumps(titles_list)


def get_branches_json():
    """
    Retrieve a list of available branches in JSON format
    :return: the list of branches in JSON format
    """
    branches = get_firm_branchs()
    branch_dict = {'branches': branches}
    return json.dumps(branch_dict)
