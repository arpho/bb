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

document.execute('/defaults/application/routing/')

router.capture('/data/db/{database}/{collection}/', '/data/db/collection/')
router.hide('/data/db/collection/')
router.capture('/data/db/{database}/{collection}/{id}', '/data/db/collection/document/')
router.hide('/data/db/collection/document/')
router.capture('/data/contacts/{id}/', '/data/updateContacts/')
router.capture('/data/contacts/', '/data/contacts/')
router.capture('/data/companies/{id}/', '/data/updateCompanies/')
router.capture('/data/companies/', '/data/companies/')
router.capture('/data/users/{id}/', '/data/updateUsers/')
router.capture('/data/users/', '/data/users/')
router.capture('/data/isin/', '/data/pushIsin/')
router.capture('/data/groups/','/data/groups/')
router.capture('/data/isin/{id}/', '/data/readIsins/')
