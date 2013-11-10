#import unittest
from Server import Prudence
from Db import Db
def test():
	p = Prudence('ad','bb','localhost')
	user = p.get_raw_user()
	User = p.get_user()
	c = p.get_companies()
	d = Db('localhost')
	c1 =d.getCompanies()
	print type(c)
	print type(c[0])
	self.assertEqual(type(c),type(c1),'i tipi esterni no')
	self.assertEqual(type(c[0]),type(c1[0]),'i tipi interni no')
