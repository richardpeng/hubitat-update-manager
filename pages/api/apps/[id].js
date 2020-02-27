import Hub from '../../../src/Api'

export default async ({ query: { id, hubUrl } }, res) => {
  const app = await new Hub(hubUrl).getApp(id);

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App with id: ${id} not found.` })
  }
}
