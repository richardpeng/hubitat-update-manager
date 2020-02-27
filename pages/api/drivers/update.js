import Hub from '../../../src/Api'

export default async ({ query: { hubUrl }, body }, res) => {
  const { id, version, source } = JSON.parse(body);
  const app = await new Hub(hubUrl).updateDriver({ id, version, source });

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Driver with id: ${id} not found.` })
  }
}
