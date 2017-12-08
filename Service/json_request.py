"""
Return a JSON Object containing the list of firms
@author Sebastian Ampuero
@date 8.12.2017
"""
import json
from Service.firmen_service import get_firm_by_name


# Retrieve a firm as json format by name
# @return the firm in json format, if not found null is returned
def get_firm_json(name):
    firma = get_firm_by_name(name)
    if not firma is None:
        firma = firma.json()
    return json.dumps(firma)
