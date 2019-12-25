import axios from 'axios';
import * as config from '../../config/connectionBase';
import Config from 'react-native-config';

export const sop = {
  find: id => {
    let sopPath = `${config.uri}/${config.sop_path(id)}`;
    let headers = {Authorization: `bearer ${Config.SERVER_SECRET_KEY_BASE}`};

    return axios.get(sopPath, {headers});
  },
};
