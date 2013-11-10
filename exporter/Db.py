from pymongo import Connection
from bson.objectid import ObjectId
class Db:
	"""
	crea la connessione a mongodb.node-mongo-bb
	"""
	def __init__(self,host = 'localhost'):
		conn = Connection(host, 27017)
		
		self.db = conn['node-mongo-bb']
		self.dbtest = conn.extjs4
		self.coll = self.dbtest.owners
		self.companies = self.db.companies
		self.contacts = self.db.contacts
		
	def getCompanies(self):
		"""ritorna la lista di tutti i record presenti nella collezione companies
		@return: list
		"""
		return list(self.companies.find())
	
	def getContacts(self):
		"""ritorna la lista di tutti i record presenti nella collezione contacts
		@note:  aggiunge il campo firm ai contatti
		@return:  list
		"""
		c = list(self.contacts.find())
		# inserisco i nomi delle aziende
		for i in c:
			firm = self.getFirm_by_id(i.get('firm_id'))
			l = lambda x: x.get('firm') if type(x) == type({})  else ''
			i['firm'] = l(firm)
		return c
		
	def getFirm_by_id(self,_id):
		"""ritorna lo item  nella collezione companies il cui campo _id corrisponde a quello passato
		@param _id:  string
		@return: {}
		"""
		return self.companies.find_one({'_id':ObjectId(_id)})