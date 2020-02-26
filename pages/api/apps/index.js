import Hub from '../../../src/Api'

export default async (req, res) => {
  const app = await Hub.fetch('apps');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App list could not be loaded.` })
  }
}
