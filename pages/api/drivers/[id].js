import Hub from '../../../src/Api'

export default async ({ query: { id, hubUrl } }, res) => {
  const Api = new Hub(hubUrl)
  const app = await Api.getDriver(id);

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Driver with id: ${id} not found.` })
  }
}
