import app from './app';

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`🚀 CAEX Tracking API corriendo en http://localhost:${PORT}`);
});
