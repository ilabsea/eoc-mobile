// const host = 'http://10.0.2.2'
const host = {
  dev: 'http://192.168.1.8',
  staging: 'http://136.228.131.101'
}
const port = 3000
const sops_path = 'api/v1/sops.json'
const tokens_path = 'api/v1/tokens'
const category_path = (id) => `api/v1/categories/${id}`

const uri = `${host.dev}:${port}`
export { uri, host, port, sops_path, tokens_path, category_path }