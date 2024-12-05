import path from 'path';
import { MarkdownParser } from '../index';
import expectedOutput from './expected/combinedSyntax.json';

describe('MarkdownParser - Combined Syntax', () => {
  it('should parse combined cases correctly', async () => {
    const parser = new MarkdownParser();

    const markdownFilePath = path.resolve(
      __dirname,
      './markdown/combinedSyntax.md'
    );
    const parsedMarkdown = await parser.parseMarkdownFile(markdownFilePath);

    expect(parsedMarkdown).toEqual(expectedOutput);
  });
});
