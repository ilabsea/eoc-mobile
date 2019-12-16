import React from 'react';
import {Text} from 'react-native';
import {regexHtml} from '../config/utils';

const Textile = ({parent_id, text}) =>
  parent_id === undefined && text !== '' ? (
    <Text numberOfLines={3} ellipsizeMode={'tail'}>
      {text.replace(regexHtml, '')}
    </Text>
  ) : null;

export default Textile;
