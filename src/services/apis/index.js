import axios from 'axios'
import * as config from '../../config/connectionBase'

const URI = `${config.host.dev}:${config.port}`

export const saveToken = async (token) => {
  let uri = `${URI}/${config.tokens_path}`

  try {
    let data = await axios.post(uri, { firebase: { token } })
                    .then( resp => resp.data )
                    .catch( error => error)
    console.log(data)
  } catch ( e ) {
    console.log(e)
  }
}

export const fetch_category_children = async (category_id) => {
  let uri = `${URI}/${config.category_path(category_id)}`

  try {
    let data = await axios.get(uri)
              .then( resp => {
                return resp.data
              } )
              .catch( err => {
                return err
              } )

    return data
  } catch(e) {
    console.error(e)
  }
}