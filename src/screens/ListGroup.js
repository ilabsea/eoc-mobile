import React from 'react'
import { List } from 'native-base'
import ListComponent from '../components/ListComponent'

const ListGroup = props => {
  let {Component} = props;
  return (
    <List>
      {props.data.map(item => {
        return (
          <ListComponent
            key={item.id}
            item={item}
            typeIcon={props.typeIcon}
            color={props.color}
            actionComponent={<Component item={item} />}
          />
        );
      })}
    </List>
  );
};

export default ListGroup;
