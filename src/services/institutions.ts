import axios from 'axios';
import { buildURLFromQueryParams } from '../utils/helpers';
import { TParams } from '../types/institutions';

const BASE_URL = 'https://banks.data.fdic.gov/api/institutions';

export default {
  getAll: async (params?: TParams) => {
    const url = buildURLFromQueryParams(BASE_URL, params);
    const { data: results } = await axios.get(url);
    return results.data;
  },
};
