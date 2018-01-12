"""
Service for creating, editing and retrieving firms
@date 8.12.2017
"""
from Entities.Ansprechpartner import Ansprechpartner
from Entities.Firma import Firma
from Service.xml_parser import get_firms_from_xml, insert_firm, delete_firm


def edit_firm(content):
    """
    Edit a firm. Delete and then create a new element with the new data
    :param content: The firm data in dictionary format
    :return: Status code of the operation
    """
    firma_dict = content
    delete_firm(firma_dict['name'].lower())
    create_firm(content)
    return 204


def create_firm(content):
    """
    Insert a new firm
    :param content: dictionary containing info of received firm from client
    :return: status code of the operation
    """
    try:
        firma_dict = content
        firma = create_new_firm_object(firma_dict)
        insert_firm(firma)
        return 201
    except:
        return 500


def create_new_firm_object(dict_content):
    """
    Create a firm object from a dictionary containing its values
    :param dict_content: dictionary containing info of received firm from client
    :return: the firm object
    """
    ansprechpartner_list = []
    for ans in dict_content['ansprechpartner']:
        telefon_list = []
        for telefon in ans['telefon[]']:
            telefon_list.append(telefon)
        ansprechpartner = Ansprechpartner(ans['name'], ans['anrede'], telefon_list, ans['email'], ans['titel'],
                                          ans['funktion'], ans['fax'])
        ansprechpartner_list.append(ansprechpartner)
    firma = Firma(dict_content['name'], dict_content['branche'], dict_content['strasse_hnr'], dict_content['plz'],
                  dict_content['ort'],
                  dict_content['land'], dict_content['website'], ansprechpartner_list, dict_content['erfassungsdatum']
                  , dict_content['adresszusatz'])
    return firma


def get_firms_by_name(name):
    """
    Retrieve a list of firms according to the name query
    :param name: the name query
    :return: the list containing matching firms
    """
    firms_elements = get_firms_from_xml()
    firms_list = []
    for f_element in firms_elements:
        if name in f_element.attrib['name'].lower():
            firms_list = get_list_of_firms_from_xml(f_element, firms_list)
    firms_list.sort(key=lambda x: x.name.lower())
    return firms_list


def get_all_firms():
    """
    Retrieve a list of all available firms
    :return: the list of all firms
    """
    firms_elements = get_firms_from_xml()
    firms_list = []
    for f_element in firms_elements:
        firms_list = get_list_of_firms_from_xml(f_element, firms_list)
    firms_list.sort(key=lambda x: x.name.lower())
    return firms_list


def get_firm_branchs():
    """
    Retrieve a list of all branches of firms
    :return: the list of branches
    """
    firms = get_all_firms()
    branchs_list = []
    for a_firm in firms:
        if a_firm.branche not in branchs_list:
            branchs_list.append(a_firm.branche)
    branchs_list.sort()
    return branchs_list


def get_list_of_firms_from_xml(f_element, firmas_list):
    """
    Populate the list of firms with the XML data
    :param f_element: the firm element from the xml file
    :param firmas_list: the list that has to be populated
    :return: the populated list
    """
    ansprechpartner_list = []
    for a_element in f_element.findall('ansprechpartner'):
        telefon_list = []
        for telefon in a_element.findall('telefon'):
            telefon_list.append(telefon.text)
        ansprechpartner = Ansprechpartner(a_element.attrib['name'], a_element.find('anrede').text,
                                          telefon_list, a_element.find('email').text,
                                          "" if a_element.find('titel') is None else a_element.find(
                                              'titel').text,
                                          "" if a_element.find('funktion') is None else a_element.find(
                                              'funktion').text,
                                          "" if a_element.find('fax') is None else a_element.find('fax').text)
        ansprechpartner_list.append(ansprechpartner)
    firma = Firma(f_element.attrib['name'], f_element.find('branche').text, f_element.find('strasse_hnr').text,
                  f_element.find('plz').text, f_element.find('ort').text, f_element.find('land').text,
                  f_element.find('website').text, ansprechpartner_list, f_element.find('erfassungsdatum').text,
                  "" if f_element.find('adresszusatz') is None else f_element.find('adresszusatz').text)
    firmas_list.append(firma)
    return firmas_list
