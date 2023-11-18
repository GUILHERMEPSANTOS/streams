import http from 'http';

import { randomUUID } from 'crypto';
import { Readable } from 'stream';


function* run() {
    for (let index = 0; index < 99; index++) {
        const data = {
            id: randomUUID(),
            nome: `Guilherme-${index}`
        }

        yield data;
    }
}


const handler = (request, response) => {
    var readable = new Readable({
        read() {
            for (const data of run()) {
                console.log(data)
                this.push(JSON.stringify(data) + "\n");
            }

            this.push(null);
        }
    });

    readable
        .pipe(response)
}


http.createServer(handler)
    .listen(3000)
    .on("listening", () => console.log("server running at 3000"));