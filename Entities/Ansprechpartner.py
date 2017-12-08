class Ansprechpartner:
    'Ansprechpartner Objekt'

    title_list = ['M.Sc.', 'M.Eng.', 'Dipl.-Inf. (FH)', 'Dipl.-Inform. (FH)', 'Dipl.-Ing. (FH)', 'Dipl.-Wirt.-Inf. (FH)',
                  'Dipl.-Wi.-Inform. (FH)', 'Dipl.-Ing.', 'Dipl.-Ing.-Inf.', 'Dr. rer. nat.']

    def __init__(self, name, anrede, telefon, email, titel=None, funktion=None, fax=None):
        self.name = name
        self.anrede = anrede
        self.telefon = telefon
        self.email = email
        self.titel = titel
        self.funktion = funktion
        self.fax = fax

    def json(self):
        return {
            "name": self.name,
            "anrede": self.anrede,
            "telefon": self.telefon,
            "email": self.email,
            "titel": self.titel,
            "funktion": self.funktion,
            "fax": self.fax
        }



