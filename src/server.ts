import * as express from "express";
import { TokenService } from './services/token-service';
import { MessageService } from "./services/message.service";

const app = express();
const jsonBodyParser = require('body-parser').json();

app.post('/token', (_request, response) => {
    const registeredHost = TokenService.generate();
    response.send(registeredHost);
});

app.post('/client/:from/message', jsonBodyParser, (request, response) => {
    const from = request.params.from;
    const toId = request.body.id;
    const toPwd = request.body.password;
    const message = request.body.message;
    console.log(request.body);
    MessageService.enqueue({
        fromToken: from,
        toToken: TokenService.getToken(toId, toPwd),
        message,
    });
    response.sendStatus(200);
});

app.get('/client/:me/messages', (request, response) => {
    const me = request.params.me;
    const messages = MessageService.dequeue(me);
    response.send(messages);
});

app.get("/", (req, res) => {
    res.send("Remote Desktop Middleware Server.")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server is running in http://localhost:${PORT}`)

})