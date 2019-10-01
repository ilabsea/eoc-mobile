const typeIcon = (docType) => {
  const type = 'MaterialIcons'

  let doc = { document: { type, icon: 'insert-drive-file', color: '#6E0505' }, 
              folder: { type, icon: 'folder', color: 'gray' } }
  return doc[docType]
}

export { typeIcon }