import path from 'path';
import { MarkdownParser } from '../index';
import expectedParagraphOutput from './expected/paragraphAndLineBreak.json';

describe('Paragraph with soft breaks no attributes', () => {
  it('should parse a simple markdown paragraph with soft breaks', async () => {
    const parser = new MarkdownParser();

    const markdownFilePath = path.resolve(__dirname, './markdown/paragraphAndLineBreak.md');
    const parsedMarkdown = await parser.parseMarkdownFile(markdownFilePath);
    
    expect(parsedMarkdown).toEqual(expectedParagraphOutput);
  });
});
