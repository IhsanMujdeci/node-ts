import {startServer} from "@app/servid/rest";

const port = parseInt(process.env.PORT ?? '')
if(isNaN(port)){
  throw new Error('Port supplied is nan')
}
startServer(port)
