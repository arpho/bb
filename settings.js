//
// Copyright 2010-2011 Three Crickets LLC.
//
// The contents of this file are subject to the terms of the Apache License
// version 2.0: http://www.opensource.org/licenses/apache2.0.php
// 
// Alternatively, you can obtain a royalty free commercial license with less
// limitations, transferable or non-transferable, directly from Three Crickets
// at http://threecrickets.com/
//

//
// MongoVision Settings
//

document.execute('/defaults/application/settings/')
showDebugOnError = false
applicationName = 'BB'
applicationDescription = 'A BB frontend'
applicationAuthor = "Giuseppe D'Amico"
applicationOwner = 'BB'
applicationHomeURL = 'bb.it'
applicationContactEmail = 'g.damico@2bconnection.com'

showDebugOnError = true
//minimumTimeBetweenValidityChecks = 0

predefinedGlobals['bb.version'] = '1.4'
predefinedGlobals['bb.extJS.debug'] = false // con true non trova troppi file
predefinedGlobals['bb.locale'] = 'it'
