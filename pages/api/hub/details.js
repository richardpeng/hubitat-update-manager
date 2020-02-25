import Hub from '../../../src/Api'

export default async (req, res) => {
  const Api = new Hub('http://hubitat/')
  const app = await Api.fetch('settings');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App with id: ${id} not found.` })
  }
}
