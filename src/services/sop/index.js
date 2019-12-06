import axios from 'axios'
import * as config from '../../config/connectionBase'

export const sop = {
  find: (id) => {
    let sopPath = `${config.uri}/${config.sop_path(id)}`

    return axios.get(sopPath)
  }
}