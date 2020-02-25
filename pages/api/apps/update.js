import Hub from '../../../Api'

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { id, version, source } = body;
  const Api = new Hub('http://hubitat/')
  const app = await Api.updateApp({ id, version, source });

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App with id: ${id} not found.` })
  }
}
