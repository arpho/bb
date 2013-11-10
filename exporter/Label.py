class Label:
	def collectLabel(self,l):
		"""genera l'elenco delle etichette, perche' potrebbero essere presenti varie versioni di documenti nella collezione in mongodb
		@param list: lista degli item in da inserire nel file excel 
		@return: []"""
		labels = {}
		for i in l:
			labels = dict(labels.items()+i.items())
		return labels.keys()