const typeIcon = (docType) => {
  let doc = { document: { icon: 'pdffile1', color: 'red' }, 
              folder: { icon: 'folder1', color: 'orange' } }
  return doc[docType]
}

export { typeIcon }