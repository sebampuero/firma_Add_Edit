class Firma:
    'Firma Objekt'

    def __init__(self,name,branche,strasse_hnr,plz,ort,land,website,ansprechpartner_liste,erfassungsdatum,letztes_speichern_datum,
                 adresszusatz=None):
        self.name = name
        self.branche = branche
        self.strasse_hnr = strasse_hnr
        self.adresszusatz = adresszusatz
        self.plz = plz
        self.ort = ort
        self.land = land
        self.website = website
        self.ansprechpartner_liste = ansprechpartner_liste
        self.erfassungsdatum = erfassungsdatum
        self.letztes_speichern_datum = letztes_speichern_datum

    def json(self):
        return {
            "name": self.name,
            "branche": self.branche,
            "strasse_hnr": self.strasse_hnr,
            "plz": self.plz,
            "ort": self.ort,
            "adresszusatz": self.adresszusatz,
            "ansprechpartner": [ans.json() for ans in self.ansprechpartner_liste],
            "website": self.website,
            "land": self.land,
            "erfassungsdatum": self.erfassungsdatum,
            "letztes_speichern_datum": self.letztes_speichern_datum
        }

