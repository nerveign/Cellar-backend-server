import { app } from './application/app';
import { logger } from './application/logging';
import { config } from './config/config';

app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
});
