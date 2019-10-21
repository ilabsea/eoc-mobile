import axios from 'axios'
import * as config from '../../config/connectionBase'

export const save_token = async (token) => {

  let uri = `${config.host.dev}:${config.port}/${config.tokens_path}`

  try {
    let data = await axios.post(uri, { firebase: { token } })
                    .then( resp => resp.data )
                    .catch( error => error)
    console.log(data)
  } catch ( e ) {
    console.log(e)
  }
  
}