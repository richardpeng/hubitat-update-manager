import Hub from '../../../Api'

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { id, version, source } = body;
  const Api = new Hub('http://hubitat/')
  const app = await Api.updateDriver({ id, version, source });

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Driver with id: ${id} not found.` })
  }
}
