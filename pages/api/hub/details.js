import Hub from '../../../src/Api'

export default async (req, res) => {
  const app = await Hub.fetch('settings');

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `Hub details could not be loaded.` })
  }
}
