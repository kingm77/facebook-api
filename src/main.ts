import { launchServer } from "./server";

const main = () => {
      const PROTOCOL = 'http';
      const HOST = 'localhost';
      const PORT = 8080;
  
    launchServer({
      protocol: PROTOCOL,
      host: HOST,
      port: PORT,
    });
  };
  
main();