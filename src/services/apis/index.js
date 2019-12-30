import axios from 'axios';
import * as config from '../../config/connectionBase';
import {service} from '../../services';
import Config from 'react-native-config';

export const saveToken = async token => {
  let tokensPath = `${config.uri}/${config.tokens_path}`;

  try {
    await axios
      .post(tokensPath, {firebase: {token}})
      .then(resp => resp.data)
      .catch(error => error);
  } catch (e) {
    service.toastManager.show(e);
  }
};

export const fetch_category_children = async category_id => {
  let uri = `${config.uri}/${config.category_path(category_id)}`;
  let headers = {Authorization: `bearer ${Config.SERVER_SECRET_KEY_BASE}`};

  try {
    let data = await axios
      .get(uri, {headers})
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        return err;
      });

    return data;
  } catch (e) {
    service.toastManager.show(e);
  }
};
