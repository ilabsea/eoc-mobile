import React from 'react'
import VersionNumber from 'react-native-version-number'
import styleUtils from './styles'
import { Text } from 'native-base'

const iconMapping = (docType) => {
  const type = 'MaterialIcons'

  let doc = { sops: { 
                type, 
                typeIcon: 'picture-as-pdf', 
                actionIcon: "file-download", 
                action: "download",
                color: '#b1090c' }, 
              categories: { 
                type, 
                typeIcon: 'folder', 
                actionIcon: "arrow-forward", 
                action: "navigate",
                color: '#f39c24' 
              } }
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
  let regex = /class='highlight'>.+<\/em>/

  words.forEach( (word, index) => {
    if( word == '<em' && regex.test(words[index+1]) ) return

    if( regex.test(word) ) {
      hl = />(.+)</.exec(word)
      data.push(<Tag key={index} style={styleUtils.searchResult}>{hl[1]}</Tag>)
    } else  {
      data.push(<Tag key={index}>{word}</Tag>)
    }
    data.push(<Text key={index + Date.now()}>{' '}</Text>)
  })

  return data
}

export { iconMapping, basename, realname, appVersion, highlight }