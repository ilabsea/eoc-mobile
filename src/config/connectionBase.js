// const host = 'http://10.0.2.2'
const host = {
  dev: 'http://192.168.1.138',
  staging: 'http://136.228.131.101'
}
const port = 3000
const sops_path   = 'api/v1/sops.json'
const tokens_path = 'api/v1/tokens'

const sop_path      = id => `api/v1/sops/${id}.json`
const category_path = id => `api/v1/categories/${id}`

const uri = `${host.staging}:${port}`
export {  uri, host, port, sop_path, 
          sops_path, tokens_path, category_path }