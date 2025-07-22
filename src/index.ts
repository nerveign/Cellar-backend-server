import { logger } from './application/logging';
import { server } from './application/socket';
import { config } from './config/config';

server.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});
