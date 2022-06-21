import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { buildURLFromQueryParams } from '../utils/helpers';

const BASE_URL = 'https://banks.data.fdic.gov/api/institutions';

async function start() {
  const url = buildURLFromQueryParams(BASE_URL, { limit: 10 });

  if (!fs.existsSync(path.join(__dirname, '/seedData.json'))) {
    console.log('Creating seed data. \n');
    const { data: results } = await axios.get(url);
    fs.writeFileSync(
      path.join(__dirname, '/seedData.json'),
      JSON.stringify(results.data)
    );

    return console.log('Done.');
  }

  return console.log('Seed data already exists.');
}

function clean() {
  const currPath = path.join(__dirname, 'seedData.json');
  if (!fs.existsSync(currPath)) return console.log('Already clean.');

  console.log('Cleaning seed data...');
  fs.unlinkSync(currPath);
  console.log('Done.');
}

function parseArgs() {
  const arg = process.argv[2];
  if (!arg) return start();
  switch (arg) {
    case 'start':
      start();
      break;
    case 'clean':
      clean();
      break;
    default:
      console.log('Not a valid input.');
      break;
  }
}

parseArgs();
