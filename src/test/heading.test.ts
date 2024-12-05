import path from 'path';
import { MarkdownParser } from '../index';
import expectedHeadingOutput from './expected/heading.json';

describe('Heading Syntax', () => {
  it('should parse a simple markdown heading', async () => {
    const parser = new MarkdownParser();

    const markdownFilePath = path.resolve(__dirname, './markdown/heading.md');
    const parsedMarkdown = await parser.parseMarkdownFile(markdownFilePath);
    
    expect(parsedMarkdown).toEqual(expectedHeadingOutput);
  });
});
