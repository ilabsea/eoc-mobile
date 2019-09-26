const typeIcon = (docType) => {
  let doc = { document: { icon: 'insert-drive-file', color: '#6E0505' }, 
              folder: { icon: 'folder', color: 'gray' } }
  return doc[docType]
}

export { typeIcon }