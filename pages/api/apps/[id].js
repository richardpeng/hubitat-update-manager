import Hub from '../../../Api'

export default async ({ query: { id } }, res) => {
  const Api = new Hub('http://hubitat/')
  const app = await Api.getApp(id);

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App with id: ${id} not found.` })
  }
}
