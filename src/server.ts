import app from '.';

const PORT = process.env.PORT;

app.listen(PORT, (): void => console.log('server up', PORT));
