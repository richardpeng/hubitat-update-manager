import Hub from '../../../src/Api'

export default async (req, res) => {
  const app = await Hub.fetch('drivers');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Driver list could not be loaded.` })
  }
}
