import Hub from '../../../src/Api'

export default async ({ body }, res) => {
  const { id, value } = JSON.parse(body);
  const app = await Hub.updateAppImportUrl({ id, value });

  if (app) {
    res.status(200).json(app)
  } else {
    res.status(404).json({ message: `App with id: ${id} not found.` })
  }
}
