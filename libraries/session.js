function check_session(coll,session_id)
{
	var user=coll.find({_id:session_id})
	return user
}
	
