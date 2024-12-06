import path from 'path';
import { MarkdownParser } from '../index';
import expectedEmphasisOutput from './expected/paragraphAndEmphasis.json';

describe('Emphasis Syntax - in Paragraph', () => {
  it('should parse a paragraph with emphasis (attributes)', async () => {
    const parser = new MarkdownParser();

    const markdownFilePath = path.resolve(__dirname, './markdown/paragraphAndEmphasis.md');
    const parsedMarkdown = await parser.parseMarkdownFile(markdownFilePath);
    
    expect(parsedMarkdown).toEqual(expectedEmphasisOutput);
  });
});
