import type { Type } from '@/Types/Type';

export type Defined = string | true;

enum TokenType {
    WHITESPACE,

    COMMENT,

    LEFT_ROUND_BRACKET,

    RIGHT_ROUND_BRACKET,

    PLUS,

    MINUS,

    BITWISE_NEGATE,

    NEGATE,

    MULTIPLY,

    DIVIDE,

    REMAINDER,

    BITWISE_SHIFT_LEFT,

    BITWISE_SHIFT_RIGHT,

    LESS_THAN,

    GREATER_THAN,

    LESS_THAN_EQUAL,

    GREATER_THAN_EQUAL,

    EQUALS,

    NOT_EQUALS,

    BITWISE_AND,

    BITWISE_XOR,

    BITWISE_OR,

    AND,

    OR,

    SYMBOL,

    INTEGER,

    IDENTIFIER,

    DEFINE_DIRECTIVE,

    UNDEFINE_DIRECTIVE,

    IF_DIRECTIVE,

    IF_DIRECTIVE_END,

    IF_DEFINED_DIRECTIVE,

    IF_NOT_DEFINED_DIRECTIVE,

    ELSE_DIRECTIVE,

    ELSE_IF_DIRECTIVE,

    ELSE_IF_DIRECTIVE_END,

    END_IF_DIRECTIVE,
}

type Token = {
    value: string;
    type: TokenType;
};

const isSpace = (char: string): boolean => char == ' ' || char == '\t';

const isNewline = (char: string): boolean => char == '\n';

const isWhitespace = (char: string): boolean => isSpace(char) || isNewline(char);

const isLineComment = (source: string, index: number): boolean =>
    source[index] == '/' && source[index + 1] == '/';

const isBlockCommentStart = (source: string, index: number): boolean =>
    source[index] == '/' && source[index + 1] == '*';

const isBlockCommentEnd = (source: string, index: number): boolean =>
    source[index] == '*' && source[index + 1] == '/';

const isSymbol = (char: string): boolean => {
    switch (char) {
        case '{':
            return true;
        case '}':
            return true;
        case ',':
            return true;
        case '.':
            return true;
        case '?':
            return true;
        case ':':
            return true;
        case '[':
            return true;
        case ']':
            return true;
        case '=':
            return true;
        case ';':
            return true;

        default:
            return false;
    }
};

const isInteger = (char: string): boolean => {
    switch (char) {
        case '0':
            return true;
        case '1':
            return true;
        case '2':
            return true;
        case '3':
            return true;
        case '4':
            return true;
        case '5':
            return true;
        case '6':
            return true;
        case '7':
            return true;
        case '8':
            return true;
        case '9':
            return true;

        default:
            return false;
    }
};

const isIdentifier = (char: string, isFirst: boolean): boolean => {
    switch (char) {
        case '_':
            return true;
        case 'a':
            return true;
        case 'b':
            return true;
        case 'c':
            return true;
        case 'd':
            return true;
        case 'e':
            return true;
        case 'f':
            return true;
        case 'g':
            return true;
        case 'h':
            return true;
        case 'i':
            return true;
        case 'j':
            return true;
        case 'k':
            return true;
        case 'l':
            return true;
        case 'm':
            return true;
        case 'n':
            return true;
        case 'o':
            return true;
        case 'p':
            return true;
        case 'q':
            return true;
        case 'r':
            return true;
        case 's':
            return true;
        case 't':
            return true;
        case 'u':
            return true;
        case 'v':
            return true;
        case 'w':
            return true;
        case 'x':
            return true;
        case 'y':
            return true;
        case 'z':
            return true;
        case 'A':
            return true;
        case 'B':
            return true;
        case 'C':
            return true;
        case 'D':
            return true;
        case 'E':
            return true;
        case 'F':
            return true;
        case 'G':
            return true;
        case 'H':
            return true;
        case 'I':
            return true;
        case 'J':
            return true;
        case 'K':
            return true;
        case 'L':
            return true;
        case 'M':
            return true;
        case 'N':
            return true;
        case 'O':
            return true;
        case 'P':
            return true;
        case 'Q':
            return true;
        case 'R':
            return true;
        case 'S':
            return true;
        case 'T':
            return true;
        case 'U':
            return true;
        case 'V':
            return true;
        case 'W':
            return true;
        case 'X':
            return true;
        case 'Y':
            return true;
        case 'Z':
            return true;
    }

    if (!isFirst && isInteger(char)) {
        return true;
    }

    return false;
};

export interface PreprocessorProperties {
    expandMacros: boolean;

    removeComments: boolean;

    removeWhitespace: boolean;
}

export class Preprocessor implements PreprocessorProperties, Type {
    public expandMacros: boolean = true;

    public removeDefines: boolean = false;

    public removeComments: boolean = false;

    public removeWhitespace: boolean = false;

    public constructor(properties: Partial<PreprocessorProperties> = {}) {
        this.expandMacros = properties.expandMacros ?? this.expandMacros;
        this.removeComments = properties.removeComments ?? this.removeComments;
        this.removeWhitespace = properties.removeWhitespace ?? this.removeWhitespace;
    }

    private source: string = '';

    private replaceNewlines(): this {
        let result = '';

        for (let i = 0; i < this.source.length; ++i) {
            if (this.source[i] != '\r') {
                result += this.source[i];
                continue;
            }

            if (this.source[i + 1] != '\n') {
                result += '\n';
                continue;
            }

            i += 1;
        }

        this.source = result;

        return this;
    }

    private escapeNewlines(): this {
        let result = '';

        for (let i = 0; i < this.source.length; ++i) {
            if (this.source[i] == '\\' && this.source[i + 1] == '\n') {
                i += 1;
                continue;
            }

            result += this.source[i];
        }

        this.source = result;

        return this;
    }

    private tokens: Token[] = [];

    private index: number = 0;

    private getWhile(filter: (char: string) => boolean): string {
        let result = '';

        while (filter(this.source[this.index]) && this.index < this.source.length) {
            result += this.source[this.index++];
        }

        return result;
    }

    private getUntil(filter: (char: string) => boolean): string {
        let result = '';

        while (!filter(this.source[this.index]) && this.index < this.source.length) {
            result += this.source[this.index++];
        }

        return result;
    }

    private parseSpace(): this {
        const value = this.getWhile(isSpace);

        if (!this.removeWhitespace) {
            this.tokens.push({ value, type: TokenType.WHITESPACE });
        }

        return this;
    }

    private parseWhitespace(): this {
        const value = this.getWhile(isWhitespace);

        if (!this.removeWhitespace) {
            this.tokens.push({ value, type: TokenType.WHITESPACE });
        }

        return this;
    }

    private parseLineComment(): this {
        const value = this.getUntil(isNewline);

        if (this.removeComments) {
            this.index += 1;

            return this;
        }

        this.tokens.push({ value, type: TokenType.COMMENT });

        if (this.removeWhitespace) {
            this.tokens.push({ value: '\n', type: TokenType.WHITESPACE });
            this.index += 1;
        }

        return this;
    }

    private parseBlockComment(): this {
        let value = '';

        while (!isBlockCommentEnd(this.source, this.index - 2)) {
            value += this.source[this.index++];
        }

        if (!this.removeComments) {
            this.tokens.push({ value, type: TokenType.COMMENT });
        }

        return this;
    }

    private handleOperator(operator: string, type: TokenType): boolean {
        let matching = true;

        for (let i = 0; i < operator.length; ++i) {
            if (this.source[this.index + i] != operator[i]) {
                matching = false;
                break;
            }
        }

        if (matching) {
            this.tokens.push({ value: operator, type });
            this.index += operator.length;

            return true;
        }

        return false;
    }

    private parseOperators(): boolean {
        if (this.handleOperator('(', TokenType.LEFT_ROUND_BRACKET)) return true;
        if (this.handleOperator(')', TokenType.RIGHT_ROUND_BRACKET)) return true;
        if (this.handleOperator('+', TokenType.PLUS)) return true;
        if (this.handleOperator('-', TokenType.MINUS)) return true;
        if (this.handleOperator('~', TokenType.BITWISE_NEGATE)) return true;
        if (this.handleOperator('!', TokenType.NEGATE)) return true;
        if (this.handleOperator('*', TokenType.MULTIPLY)) return true;
        if (this.handleOperator('/', TokenType.DIVIDE)) return true;
        if (this.handleOperator('%', TokenType.REMAINDER)) return true;
        if (this.handleOperator('<<', TokenType.BITWISE_SHIFT_LEFT)) return true;
        if (this.handleOperator('>>', TokenType.BITWISE_SHIFT_RIGHT)) return true;
        if (this.handleOperator('<', TokenType.LESS_THAN)) return true;
        if (this.handleOperator('>', TokenType.GREATER_THAN)) return true;
        if (this.handleOperator('<=', TokenType.LESS_THAN_EQUAL)) return true;
        if (this.handleOperator('>=', TokenType.GREATER_THAN_EQUAL)) return true;
        if (this.handleOperator('==', TokenType.EQUALS)) return true;
        if (this.handleOperator('!=', TokenType.NOT_EQUALS)) return true;
        if (this.handleOperator('&', TokenType.BITWISE_AND)) return true;
        if (this.handleOperator('^', TokenType.BITWISE_XOR)) return true;
        if (this.handleOperator('|', TokenType.BITWISE_OR)) return true;
        if (this.handleOperator('&&', TokenType.AND)) return true;
        if (this.handleOperator('||', TokenType.OR)) return true;

        return false;
    }

    private parseSymbol(): this {
        const value = this.getWhile(isSymbol);

        this.tokens.push({ value, type: TokenType.SYMBOL });

        return this;
    }

    private parseInteger(): this {
        const value = this.getWhile(isInteger);

        this.tokens.push({ value, type: TokenType.INTEGER });

        return this;
    }

    private parseIdentifier(): this {
        let value = '';

        let isFirst = true;
        while (isIdentifier(this.source[this.index], isFirst)) {
            value += this.source[this.index++];
            isFirst = false;
        }

        this.tokens.push({ value, type: TokenType.IDENTIFIER });

        return this;
    }

    private handleDefineDirective(): this {
        this.tokens.push({ value: '#define', type: TokenType.DEFINE_DIRECTIVE });

        const spaceName = this.getWhile(isSpace);
        if (!this.expandMacros) {
            this.tokens.push({
                value: this.removeWhitespace ? ' ' : spaceName,
                type: TokenType.WHITESPACE,
            });
        }

        const name = this.getUntil(isWhitespace);
        this.tokens.push({ value: name, type: TokenType.IDENTIFIER });

        if (isNewline(this.source[this.index])) return this;

        const spaceReplacement = this.getWhile(isSpace);
        if (!this.expandMacros) {
            this.tokens.push({
                value: this.removeWhitespace ? ' ' : spaceReplacement,
                type: TokenType.WHITESPACE,
            });
        }

        const replacement = this.getUntil(isNewline);
        this.tokens.push({ value: replacement, type: TokenType.IDENTIFIER });

        return this;
    }

    private handleUndefineDirective(): this {
        this.tokens.push({ value: '#undef', type: TokenType.UNDEFINE_DIRECTIVE });

        const spaceName = this.getWhile(isSpace);
        if (!this.expandMacros) {
            this.tokens.push({
                value: this.removeWhitespace ? ' ' : spaceName,
                type: TokenType.WHITESPACE,
            });
        }

        const name = this.getUntil(isWhitespace);
        this.tokens.push({ value: name, type: TokenType.IDENTIFIER });

        return this;
    }

    private handleIfDirective(): this {
        this.tokens.push({ value: '#if', type: TokenType.IF_DIRECTIVE });

        while (!isNewline(this.source[this.index])) {
            if (isSpace(this.source[this.index])) {
                this.parseSpace();
                continue;
            }

            if (this.parseOperators()) continue;

            if (isInteger(this.source[this.index])) {
                this.parseInteger();
                continue;
            }

            if (isIdentifier(this.source[this.index], true)) {
                this.parseIdentifier();
                continue;
            }
        }

        this.tokens.push({ value: '', type: TokenType.IF_DIRECTIVE_END });

        return this;
    }

    private handleIfDefinedDirective(): this {
        this.tokens.push({ value: '#ifdef', type: TokenType.IF_DEFINED_DIRECTIVE });

        const spaceName = this.getWhile(isSpace);
        if (!this.expandMacros) {
            this.tokens.push({
                value: this.removeWhitespace ? ' ' : spaceName,
                type: TokenType.WHITESPACE,
            });
        }

        const name = this.getUntil(isWhitespace);
        this.tokens.push({ value: name, type: TokenType.IDENTIFIER });

        return this;
    }

    private handleIfNotDefinedDirective(): this {
        this.tokens.push({ value: '#ifndef', type: TokenType.IF_NOT_DEFINED_DIRECTIVE });

        const spaceName = this.getWhile(isSpace);
        if (!this.expandMacros) {
            this.tokens.push({
                value: this.removeWhitespace ? ' ' : spaceName,
                type: TokenType.WHITESPACE,
            });
        }

        const name = this.getUntil(isWhitespace);
        this.tokens.push({ value: name, type: TokenType.IDENTIFIER });

        return this;
    }

    private handleElseDirective(): this {
        this.tokens.push({ value: '#else', type: TokenType.ELSE_DIRECTIVE });

        return this;
    }

    private handleElseIfDirective(): this {
        this.tokens.push({ value: '#elseif', type: TokenType.ELSE_IF_DIRECTIVE });

        while (!isNewline(this.source[this.index])) {
            if (isSpace(this.source[this.index])) {
                this.parseSpace();
                continue;
            }

            if (this.parseOperators()) continue;

            if (isInteger(this.source[this.index])) {
                this.parseInteger();
                continue;
            }

            if (isIdentifier(this.source[this.index], true)) {
                this.parseIdentifier();
                continue;
            }

            this.index += 1;
        }

        this.tokens.push({ value: '', type: TokenType.ELSE_IF_DIRECTIVE_END });

        return this;
    }

    private handleEndIfDirective(): this {
        this.tokens.push({ value: '#endif', type: TokenType.END_IF_DIRECTIVE });

        const space = this.getUntil(isNewline);
        if (!this.removeWhitespace) {
            this.tokens.push({ value: space, type: TokenType.WHITESPACE });
        }

        return this;
    }

    private parseDirective(): this {
        const directive = this.getUntil(isWhitespace);

        switch (directive) {
            case '#define':
                this.handleDefineDirective();
                break;
            case '#undef':
                this.handleUndefineDirective();
                break;

            case '#if':
                this.handleIfDirective();
                break;
            case '#ifdef':
                this.handleIfDefinedDirective();
                break;
            case '#ifndef':
                this.handleIfNotDefinedDirective();
                break;
            case '#else':
                this.handleElseDirective();
                break;
            case '#elseif':
                this.handleElseIfDirective();
                break;
            case '#endif':
                this.handleEndIfDirective();
                break;
        }

        this.parseSpace();

        if (this.source[this.index] == '\n') {
            this.tokens.push({ value: this.source[this.index++], type: TokenType.WHITESPACE });
        }

        return this;
    }

    private tokenize(): this {
        this.tokens = [];

        for (this.index = 0; this.index < this.source.length; ) {
            if (isWhitespace(this.source[this.index])) {
                this.parseWhitespace();
                continue;
            }

            if (isLineComment(this.source, this.index)) {
                this.parseLineComment();
                continue;
            }

            if (isBlockCommentStart(this.source, this.index)) {
                this.parseBlockComment();
                continue;
            }

            if (this.parseOperators()) continue;

            if (isSymbol(this.source[this.index])) {
                this.parseSymbol();
                continue;
            }

            if (isInteger(this.source[this.index])) {
                this.parseInteger();
                continue;
            }

            if (isIdentifier(this.source[this.index], true)) {
                this.parseIdentifier();
                continue;
            }

            if (this.source[this.index] == '#') {
                this.parseDirective();
                continue;
            }

            this.index += 1;
        }

        return this;
    }

    public processed: string = '';

    public defines: Record<string, Defined> = {};

    public process(source: string): this {
        this.source = source;

        this.replaceNewlines();
        this.escapeNewlines();

        this.defines = {};
        this.tokenize();

        this.processed = this.tokens.map(token => token.value).join('');

        return this;
    }

    public get objectClassName(): string {
        return 'Preprocessor';
    }

    public label: string = '';
}
