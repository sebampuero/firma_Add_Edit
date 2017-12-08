"""
Return a JSON Object containing the list of firms
@author Sebastian Ampuero
@date 8.12.2017
"""
import json
from Service.firmen_service import get_firms


def get_firms_json():
    list = get_firms()
    firmen_dictionary = []
    for a_firm in list:
        firma = a_firm.json()
        firmen_dictionary.append(firma)
    return json.dumps(firmen_dictionary)




