import React from 'react';
import styleUtils from '../config/styles';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  PixelRatio,
} from 'react-native';
import {Button, H3, Icon} from 'native-base';
import CardView from 'react-native-cardview';
import {withNavigation} from 'react-navigation';
import {service} from '../services';

import Textile from '../components/TextileComponent';

class ListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.showDetail = this.showDetail.bind(this);
  }

  showDetail() {
    const {item, navigation} = this.props;
    navigation.navigate('SopDetail', {item});
    service.firebaseManager.logEvent('SHOW_DETAIL', {id: item.id});
  }

  navigate() {
    const {item, navigation} = this.props;
    navigation.push('Category', {sopGuide: item});
    service.firebaseManager.logEvent('EVENT_NAVIGATE', {id: item.id});
  }

  perform() {
    const {item} = this.props;
    item.hasOwnProperty('description') ? this.showDetail() : this.navigate();
  }

  render() {
    let {item, typeIcon, color} = this.props;
    let {parent_id, name, description} = item;

    return (
      <TouchableWithoutFeedback onPress={() => this.perform()}>
        <CardView
          cardElevation={5}
          cardMaxElevation={2}
          style={styles.cardview}
          cornerRadius={5}>
          <View style={styles.wrapper}>
            <View style={styles.center}>
              <Button transparent style={styleUtils.btnIcon}>
                <Icon
                  type="MaterialIcons"
                  style={[styles.icon, {color}]}
                  name={typeIcon}
                />
              </Button>
            </View>

            <View style={styles.descriptionWrapper}>
              <H3
                style={styles.header}
                numberOfLines={3}
                ellipsizeMode={'tail'}>
                {name}
              </H3>
              {description ? (
                <Textile parent_id={parent_id} text={description} />
              ) : null}
            </View>

            <View style={styles.center}>{this.props.actionComponent}</View>
          </View>
        </CardView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    margin: 10,
    padding: 10,
    marginBottom: 0,
  },
  cardview: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 0,
  },
  descriptionWrapper: {
    flex: 3,
    justifyContent: 'center',
  },
  icon: {
    fontSize: (42 * 2.75) / PixelRatio.get(),
  },
  indicatorIcon: {
    fontSize: 32,
  },
  content: {
    flex: 3,
    justifyContent: 'center',
  },
});

export default withNavigation(ListComponent);
