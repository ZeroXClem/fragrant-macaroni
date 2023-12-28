import { main } from './index';
import { Client, PageObjectResponse, DatabaseObjectResponse } from '@notionhq/client';
import { mocked } from 'ts-jest/utils';

jest.mock('@notionhq/client');

const mockClient = new Client({ auth: process.env.NOTION_TOKEN });

const mockPage: PageObjectResponse = {
  object: 'page',
  id: 'page-id',
  created_time: new Date().toISOString(),
  last_edited_time: new Date().toISOString(),
  parent: { type: 'database_id', database_id: 'database-id' },
  properties: {},
  url: 'https://www.notion.so/page-id',
};

const mockDatabase: DatabaseObjectResponse = {
  object: 'database',
  id: 'database-id',
  created_time: new Date().toISOString(),
  last_edited_time: new Date().toISOString(),
  title: [],
  properties: {},
};

describe('main', () => {
  beforeEach(() => {
    mocked(mockClient.pages.retrieve).mockResolvedValue(mockPage);
    mocked(mockClient.databases.query).mockResolvedValue({ results: [mockDatabase] });
  });

  it('should process pages correctly', async () => {
    process.env.NOTION_TOKEN = 'test-token';
    await main();
    expect(mockClient.pages.retrieve).toHaveBeenCalledWith({ page_id: mockPage.id });
  });

  it('should process databases correctly', async () => {
    process.env.NOTION_TOKEN = 'test-token';
    await main();
    expect(mockClient.databases.query).toHaveBeenCalledWith({ database_id: mockDatabase.id });
  });
});
