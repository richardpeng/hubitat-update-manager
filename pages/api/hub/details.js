import Hub from '../../../src/Api'

export default async ({ query: { hubUrl } }, res) => {
  const app = await new Hub(hubUrl).fetch('settings');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Hub details could not be loaded.` })
  }
}
