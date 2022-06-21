import { graphql } from 'graphql';
import { schema, root } from '../controllers/graphql';
import { TInstitutions } from '../types/institutions';
import * as helpers from '../utils/helpers';

describe('Util "isEmpty"', () => {
  it('Returns true when empty', () => {
    expect(helpers.isEmpty({})).toBe(true);
  });

  it('Returns false when not empty', () => {
    const nonEmptyObject = { notEmpty: true };
    expect(helpers.isEmpty(nonEmptyObject)).toBe(false);
  });
});

describe('Util "buildURLFromQueryParams"', () => {
  const testBaseURL = 'https://baseurl.com/api';

  it('Builds the URL properly', () => {
    const testParams = { limit: 10, fields: 'ZIP' };
    const testBuiltURL = `${testBaseURL}?limit=10&fields=ZIP`;

    expect(helpers.buildURLFromQueryParams(testBaseURL, testParams)).toBe(
      testBuiltURL
    );
  });

  it('Handles the case of no params', () => {
    expect(helpers.buildURLFromQueryParams(testBaseURL)).toBe(testBaseURL);
  });
});

describe('Wrapped graphQL API ', () => {
  it('Fetches a non-empty array', async () => {
    const query = `
      {
        institutions {
          data {
            ZIP
          }
          score
        }
      }
    `;

    const results = await graphql({
      schema,
      rootValue: await root,
      source: query,
    });

    const { institutions } = (results?.data || {}) as TInstitutions;

    expect(institutions).toBeTruthy();
    expect(institutions).toBeInstanceOf(Array);
    expect(institutions?.length).toBe(10);
  });

  it('Accepts various query params', async () => {
    const query = `
      {
        institutions(limit: 10, fields: "ZIP,ACTIVE,NAME") {
          score
          data {
            ZIP
            ACTIVE
            ADDRESS
            NAME
            CITY
            COUNTY
            OFFICES
          }
        }
      }
    `;

    const results = await graphql({
      schema,
      rootValue: await root,
      source: query,
    });

    const { institutions } = results.data as TInstitutions;

    const filteredInstitutions = institutions.filter(({ data }) => {
      const { ZIP, ACTIVE, NAME, OFFICES, CITY, COUNTY } = data || {};
      return !(ZIP && !!ACTIVE && NAME && !OFFICES && !CITY && !COUNTY);
    });

    expect(institutions.length).toBe(10);
    expect(filteredInstitutions.length).toBe(0);
  });
});
