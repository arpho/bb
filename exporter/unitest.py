import unittest
from Db import Db
from Server import Prudence
from Server import User
from Server import Super_user



class MyTest(unittest.TestCase):
	def test(self):
		d = Db('localhost')
		p = Prudence('ad','bb','localhost')
		users_type = {True:Super_user,False:User}
		raw_user = p.get_raw_user()
		user = p.get_user()
		self.assertEqual(raw_user['session_id'], user.get_session_id(), 'no session_id')
		self.assertEqual(raw_user['group_id'], user.get_group_id(), 'no group_id')
		self.assertEqual("?session_id={0}%group_id={1}".format(user.get_session_id(),user.get_group_id()),
				"?session_id={0}%group_id={1}".format(user.get_session_id(),user.get_group_id()), 'no parameters')
	
	