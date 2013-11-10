import unittest
from Server import User
from Server import Super_user



class MyTest(unittest.TestCase):
	def test(self):
		
		u= dict(session_id=1,group_id=1,user='test',superuser=False)
		user =User(u)
		suser = Super_user(u)
		self.assertEqual(user.get_session_id(), 1, 'no session_id')
		self.assertEqual(1, user.get_group_id(), 'no group')
		self.assertEqual("?session_id=1%group_id=1", user.get_parameters(), 'no parameters')
		self.assertEqual("?session_id=1", suser.get_parameters(), 'no parameters')
		