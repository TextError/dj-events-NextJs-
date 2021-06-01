const { events } = require('./data.json');

export default (req, res) => {
  const { slug } = req.query;
  const evt = events.filter(el => el.slug === slug);

  if(req.method === 'GET') return res.status(200).json(evt);
  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ message: `${req.method} is not allowed` });
};