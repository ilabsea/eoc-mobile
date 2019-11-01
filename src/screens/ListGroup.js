import React from 'react'
import { List, H3 } from 'native-base'
import ListComponent from '../components/ListComponent'

const ListGroup = (props) => {
  let { Component, navigation, database } = props
  return <>
    { props.data.length > 0 ? <H3>{props.title}:</H3> : null }
    <List>
      {
        props.data.map( item => {
          return <ListComponent key={item.id} 
                          item={item} 
                          database={props.database}
                          typeIcon={props.typeIcon}
                          color={props.color}
                          actionComponent={<Component item={item} database={database} navigation={navigation} />}
                          navigation={navigation} /> })
      }
    </List>
  </>
}

export default ListGroup