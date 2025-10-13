import path from 'node:path';

process.env['SUPPRESS_NO_CONFIG_WARNING'] = 'true';
process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../../../../config');

import fs from 'node:fs';
import config from 'config';
import inquirer from 'inquirer';

export default async () => {
  const hasApiKey = await new Promise((resolve) => {
    resolve(config.get('services.openai.apiKey'));
  }).catch(() => '');

  if (!hasApiKey) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Please enter your OpenAI API key:',
      },
    ]);

    const configFile = `${process.env['NODE_CONFIG_DIR']}/default.json`;
    const configObject = require(configFile);

    configObject.services.openai.apiKey = answers.apiKey;

    const stringifiedConfig = JSON.stringify(configObject, null, 2);

    fs.writeFileSync(configFile, stringifiedConfig);

    process.env.NODE_CONFIG = stringifiedConfig;

    delete require.cache[require.resolve('config')];

    const _ = (await import('config')).default;
  }
};
