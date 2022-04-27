import app from '.';

const PORT = process.env.PORT || 8080;

app.listen(PORT, (): void => console.log('server up', PORT));
