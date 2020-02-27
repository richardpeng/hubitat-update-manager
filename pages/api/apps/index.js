import Hub from '../../../src/Api'

export default async ({ query: { hubUrl } }, res) => {
  const app = await new Hub(hubUrl).fetch('apps');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App list could not be loaded.` })
  }
}
