import React from 'react'
import VersionNumber from 'react-native-version-number'
import styleUtils from './styles'
import { Text } from 'native-base'

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

const appVersion = VersionNumber.appVersion

const highlight = (text, Tag) => {
  let data = []
  words = text.split(/\s/)
  let regex = /class='highlight'>\w+<\/em>/

  words.forEach( (word, index) => {
    if( word == '<em' && regex.test(words[index+1]) ) return

    if( regex.test(word) ) {
      hl = />(\w+)</.exec(word)
      data.push(<Tag key={index} style={styleUtils.searchResult}>{hl[1]}</Tag>)
    } else  {
      data.push(<Tag key={index}>{word}</Tag>)
    }
    data.push(<Text key={index + Date.now()}>{' '}</Text>)
  })

  return data
}

export { typeIcon, basename, realname, appVersion, highlight }