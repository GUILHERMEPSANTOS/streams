import axios from "axios";
import {
    Transform,
    Writable,
} from 'stream'

const url = "http://localhost:3000";

const consume = async () => {
    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return response.data;
}

const stream = await consume();

stream
    .pipe(new Transform({
        transform(chunk, encoding, callback) {
            const item = JSON.parse(chunk);
            const number = /\d+/.exec(item.nome)[0]
            let nome = item.nome;

            if (number % 2 == 0) {
                nome = nome.concat(" é par");
            }
            else {
                nome = nome.concat(" é impar");
            }

            item.nome = nome;

            callback(null, JSON.stringify(item));
        }
    }))
    .pipe(new Writable({
        write(chunk, encoding, callback) {
            console.log("chunk", chunk.toString())
            callback();
        }
    }))