import { promises as fs } from 'fs';
import MarkdownIt from 'markdown-it';
import { Token } from './types';

class MarkdownParser {
  private md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt();
  }

  private handleHeadingOpen(
    token: Token,
    tokens: Token[],
    index: number,
    result: any[]
  ) {
    const contentToken = tokens[index + 1];
    result.push({
      type: 'heading',
      variant: token.tag,
      content: contentToken.content,
    });
  }

  private handleParagraphOpen(currentParagraph: any) {
    currentParagraph.value = {
      type: 'paragraph',
      children: [],
    };
  }
  private pushSpan(
    currentParagraph: any,
    content: string | undefined,
    attributes: string[]
  ) {
    if (content) {
      currentParagraph.value.children.push({
        type: 'span',
        content,
        attributes: [...attributes],
      });
    }
  }
  private handleInline(
    token: Token,
    currentParagraph: any,
    currentAttributes: string[]
  ) {
    token.children?.forEach((child: Token) => {
      if (child.type === 'text') {
        if (currentParagraph.value) {
          this.pushSpan(currentParagraph, child.content, currentAttributes);
        }
      } else if (child.type === 'softbreak' || child.type === 'hardbreak') {
        if (currentParagraph.value) {
          currentParagraph.value.children.push({
            type: 'lineBreak',
          });
        }
      } else if (child.type === 'strong_open') {
        currentAttributes.push('strong');
      } else if (child.type === 'strong_close') {
        currentAttributes = currentAttributes.filter(
          (attr) => attr !== 'strong'
        );
      } else if (child.type === 'em_open') {
        currentAttributes.push('em');
      } else if (child.type === 'em_close') {
        currentAttributes = currentAttributes.filter((attr) => attr !== 'em');
      } else if (child.type === 'code_inline') {
        if (currentParagraph.value) {
          this.pushSpan(currentParagraph, child.content, [
            'code-inline',
            ...currentAttributes,
          ]);
        }
      }
    });
  }

  private handleParagraphClose(currentParagraph: any, result: any[]) {
    if (currentParagraph.value) {
      result.push(currentParagraph.value);
      currentParagraph.value = null;
    }
  }

  private parseTokensToObject(tokens: Token[]) {
    const result: any[] = [];
    let currentParagraph: any = { value: null };
    let currentAttributes: string[] = [];

    tokens.forEach((token, index) => {
      if (token.type === 'heading_open') {
        this.handleHeadingOpen(token, tokens, index, result);
      } else if (token.type === 'paragraph_open') {
        this.handleParagraphOpen(currentParagraph);
      } else if (token.type === 'inline') {
        this.handleInline(token, currentParagraph, currentAttributes);
      } else if (token.type === 'paragraph_close') {
        this.handleParagraphClose(currentParagraph, result);
      }
    });

    return result;
  }

  public async parseMarkdownFile(fileName: string) {
    const fileContent = await fs.readFile(fileName, 'utf-8');
    return this.parseMarkdownString(fileContent);
  }
  public async parseMarkdownString(content: string) {
    const tokens = this.md.parse(content, {});
    return this.parseTokensToObject(tokens);
  }
}

export { MarkdownParser };
