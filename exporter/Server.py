from httplib2 import Http
from urllib import urlencode
import json
import hashlib


class User:
	"""astrae il concetto di utente usato dalla classe Prudence
	"""
	def __init__(self,user):
		self.user = user
	
	def get_parameters(self):
		"""ritorna i parametri che vengono aggiunti alle richieste al server
		@return: string
		"""
		return "?session_id={0}%group_id={1}".format(self.user['session_id'],self.user['group_id'])
	
	def is_superuser(self):
		"""
		@return: boolean
		"""
		return False
	
	def get_session_id(self):
		"""
		@return: string
		"""
		return self.user['session_id']
	
	def get_group_id(self):
		"""
		@return: string
		"""
		return self.user['group_id']
	
	
class Super_user(User):
	def __init__(self,user):
		User.__init__(self, user)
		
	def is_superuser(self):
		"""
		@return: bool
		"""
		return True
	
	def get_parameters(self):
		"""ritorna i parametri che vengono aggiunti alle richieste al server
		@return: string
		"""
		return "?session_id={0}".format(self.get_session_id())
	
	def get_session_id(self):
		"""
		@return: string
		"""
		return User.get_session_id(self)
		
		
class Prudence:
	def __init__(self,user,pwd,host):
		self.h = Http()
		self.host = host
		users_type = {True:Super_user,False:User}
		data = dict(loginPassword=hashlib.sha1(pwd).hexdigest(),loginUsername=user)
		self.headers = {'Content-type': 'application/x-www-form-urlencoded'}
		resp, content = self.h.request("http://"+host+":8080/bb/data/login/","POST",headers=self.headers, body= urlencode(data))
		self.raw_user = json.loads(content)['user']
		self.User = users_type[self.raw_user['superuser']](self.raw_user)
		self.contacts = []
		
	def get_user(self):
		return self.User
	
	def get_raw_user(self):
		return self.raw_user
	
	def get_contacts(self):
		if len(self.contacts)==0:# meccanismo di caching
			data = dict(session_id=self.User.get_session_id())
			r, c = self.h.request("http://"+self.host+":8080/bb/data/contacts/"+self.User.get_parameters(),"GET",headers=self.headers, body= urlencode(data))
			self.contacts = json.loads(c).get('data')
		return self.contacts
	
	def get_companies(self):
		data = dict(session_id=self.User.get_session_id())
		r, c = self.h.request("http://"+self.host+":8080/bb/data/companies/"+self.User.get_parameters(),"GET",headers=self.headers, body= urlencode(data))
		self.companies = json.loads(c).get('data')
		return self.companies
	
	
class Prudence_emproved(Prudence):
	""" estende Prudence per avere l'esportazione degli isin"""
	def __init__(self,user,pwd,host):
		Prudence.__init__(self, user, pwd, host)
		
	def get_isin(self,_id):
		data = dict(session_id=self.User.get_session_id())
		#print "url:","http://"+self.host+":8080/bb/data/isin/"+_id+'/'+self.User.get_parameters()
		r, c = self.h.request("http://"+self.host+":8080/bb/data/isin/"+_id+'/'+self.User.get_parameters(),"GET",headers=self.headers, body= urlencode(data))
		return json.loads(c)
	