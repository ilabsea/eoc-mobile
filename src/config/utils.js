const typeIcon = (docType) => {
  const type = 'MaterialIcons'

  let doc = { document: { type, icon: 'insert-drive-file', color: '#6E0505' }, 
              folder: { type, icon: 'folder', color: 'gray' } }
  return doc[docType]
}

const basename = (path) => {
  return path.split('/').reverse()[0]
}

const realname = (path) => {
  const reg = /-(.*)\.{0,3}$/.exec(path)
  return reg[1]
}

export { typeIcon, basename, realname }