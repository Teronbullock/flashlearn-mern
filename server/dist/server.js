import app from './app.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
const port = process.env.SERVER_DEV_PORT || 5001;
const prodServerHost = process.env.HOST || 'localhost';
const keyPath = path.resolve(process.cwd(), 'certs', 'key.pem');
const certPath = path.resolve(process.cwd(), 'certs', 'cert.pem');
if (process.env.NODE_ENV === 'production') {
    const server = https.createServer({
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
    }, app).listen(port, () => {
        console.log(`Express app listening on https://${prodServerHost}:${port}/api/`);
    });
}
else {
    app.listen(port, () => {
        console.log(`Express app listening on http://localhost:${port}/api/`);
    });
}
//# sourceMappingURL=server.js.map