function isEnabled(){
	return this.user.enabled
}
function isLogged(){
	return this.user.logged
}

function isAdmin(){
	return this.user.superuser
}

function setUser(user){
	this.user = user
}


function User(user){
	this.user = user
	this.isAdmin = isAdmin
	this.isLogged = isLogged
	this.isEnabled = isEnabled
	this.setUser = setUser
}
