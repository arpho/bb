from Server import Prudence_emproved as Prudence
from  Excel import Excel
from Db import Db
import datetime
import sys
import pickle
"""
main del package exporter
accetta il data del file di destinazione come primo argomento
"""

data = str(datetime.date.today())
locals = dict(host='localhost',user='me',pwd='bb')
host = sys.argv[1]
user = sys.argv[2]
pwd = sys.argv[3]
out_contatti = open('contatti-'+str(data)+'.ser','wb')
out_aziende = open('aziende-'+str(data)+'.ser','wb')
d = Prudence(locals['user'],locals['pwd'],locals['host'])
e = Excel(data)
#print d.get_contacts()
#print d.get_isin("51651561ae529a6d504740d4")
c = d.get_contacts()
e.make_isin_sheet(c)
e.makeCompanySheet(d.get_companies())
e.makeContactSheet(c)
e.saveWorkbook()
pickle.dump(d.get_contacts(), out_contatti, 2)
pickle.dump(d.get_contacts(),out_aziende,2)
print "finito"," ho creato i file",data+'.xls'+', contatti-{0}.ser e aziende-{0}.ser'.format(data)