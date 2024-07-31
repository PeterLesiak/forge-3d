import type { Type } from '@/Types/Type';
import type { Keys } from '@/Types/Utilities';

const matchString = (compare: string, source: string, index: number): boolean => {
    for (let i = 0; i < compare.length; ++i) {
        if (source[index + i] != compare[i]) return false;
    }

    return true;
};

const isSpace = (source: string, index: number): boolean => {
    return source[index] == ' ' || source[index] == '\t';
};

const isNewline = (source: string, index: number): boolean => {
    return source[index] == '\n';
};

const isWhitespace = (source: string, index: number): boolean => {
    return isSpace(source, index) || isNewline(source, index);
};

const isSingleQuote = (source: string, index: number): boolean => {
    return source[index] == `'`;
};

const isDoubleQuote = (source: string, index: number): boolean => {
    return source[index] == `"`;
};

const isQuote = (source: string, index: number): boolean => {
    return isSingleQuote(source, index) || isDoubleQuote(source, index);
};

const isLineComment = (source: string, index: number): boolean => {
    return matchString('//', source, index);
};

const isBlockCommentStart = (source: string, index: number): boolean => {
    return matchString('/*', source, index);
};

const isBlockCommentEnd = (source: string, index: number): boolean => {
    return matchString('*/', source, index);
};

const isInteger = (source: string, index: number): boolean => {
    switch (source[index]) {
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

const isIdentifier = (source: string, index: number, first: boolean): boolean => {
    switch (source[index]) {
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

    if (!first && isInteger(source, index)) {
        return true;
    }

    return false;
};

const isDefineDirective = (source: string, index: number): boolean => {
    return matchString('#define', source, index);
};

const isUndefineDirective = (source: string, index: number): boolean => {
    return matchString('#undef', source, index);
};

const isIfDirective = (source: string, index: number): boolean => {
    return matchString('#if', source, index);
};

const isIfDefinedDirective = (source: string, index: number): boolean => {
    return matchString('#ifdef', source, index);
};

const isIfNotDefinedDirective = (source: string, index: number): boolean => {
    return matchString('#ifndef', source, index);
};

const isElseDirective = (source: string, index: number): boolean => {
    return matchString('#else', source, index);
};

const isElseIfDirective = (source: string, index: number): boolean => {
    return matchString('#elif', source, index);
};

const isEndIfDirective = (source: string, index: number): boolean => {
    return matchString('#endif', source, index);
};

const isLineDirective = (source: string, index: number): boolean => {
    return matchString('#line', source, index);
};

const isIncludeDirective = (source: string, index: number): boolean => {
    return matchString('#include', source, index);
};

const isErrorDirective = (source: string, index: number): boolean => {
    return matchString('#error', source, index);
};

const isWarningDirective = (source: string, index: number): boolean => {
    return matchString('#warning', source, index);
};

const isPragmaDirective = (source: string, index: number): boolean => {
    return matchString('#pragma', source, index);
};

const UnaryOperator = {
    PLUS: 'PLUS',

    MINUS: 'MINUS',

    BITWISE_NEGATE: 'BITWISE_NEGATE',

    NEGATE: 'NEGATE',
} as const;

const BinaryOperator = {
    MULTIPLY: 'MULTIPLY',

    DIVIDE: 'DIVIDE',

    REMAINDER: 'REMAINDER',

    BITWISE_SHIFT_LEFT: 'BITWISE_SHIFT_LEFT',

    BITWISE_SHIFT_RIGHT: 'BITWISE_SHIFT_RIGHT',

    LESS_THAN: 'LESS_THAN',

    GREATER_THAN: 'GREATER_THAN',

    LESS_THAN_EQUAL: 'LESS_THAN_EQUAL',

    GREATER_THAN_EQUAL: 'GREATER_THAN_EQUAL',

    EQUALS: 'EQUALS',

    NOT_EQUALS: 'NOT_EQUALS',

    BITWISE_AND: 'BITWISE_AND',

    BITWISE_XOR: 'BITWISE_XOR',

    BITWISE_OR: 'BITWISE_OR',

    AND: 'AND',

    OR: 'OR',
} as const;

const TokenType = {
    ...UnaryOperator,
    ...BinaryOperator,
    ...({
        SPACE: 'SPACE',

        NEWLINE: 'NEWLINE',

        COMMENT: 'COMMENT',

        LEFT_ROUND_BRACKET: 'LEFT_ROUND_BRACKET',

        RIGHT_ROUND_BRACKET: 'RIGHT_ROUND_BRACKET',

        INTEGER: 'INTEGER',

        IDENTIFIER: 'IDENTIFIER',

        STRING: 'STRING',

        DEFINE_DIRECTIVE: 'DEFINE_DIRECTIVE',

        UNDEFINE_DIRECTIVE: 'UNDEFINE_DIRECTIVE',

        IF_DIRECTIVE: 'IF_DIRECTIVE',

        IF_DEFINED_DIRECTIVE: 'IF_DEFINED_DIRECTIVE',

        IF_NOT_DEFINED_DIRECTIVE: 'IF_NOT_DEFINED_DIRECTIVE',

        ELSE_DIRECTIVE: 'ELSE_DIRECTIVE',

        ELSE_IF_DIRECTIVE: 'ELSE_IF_DIRECTIVE',

        END_IF_DIRECTIVE: 'END_IF_DIRECTIVE',

        LINE_DIRECTIVE: 'LINE_DIRECTIVE',

        INCLUDE_DIRECTIVE: 'INCLUDE_DIRECTIVE',

        ERROR_DIRECTIVE: 'ERROR_DIRECTIVE',

        WARNING_DIRECTIVE: 'WARNING_DIRECTIVE',

        UNKNOWN: 'UNKNOWN',
    } as const),
};

type Token = {
    type: Keys<typeof TokenType>;
    value: string;
};

type Expression = BinaryExpression | UnaryExpression | number;

class UnaryExpression {
    public value: Expression;

    public operator: Keys<typeof UnaryOperator>;

    public constructor(value: Expression, operator: Keys<typeof UnaryOperator>) {
        this.value = value;
        this.operator = operator;
    }
}

class BinaryExpression {
    public left: Expression;

    public operator: Keys<typeof BinaryOperator>;

    public right: Expression;

    public constructor(
        left: Expression,
        operator: Keys<typeof BinaryOperator>,
        right: Expression,
    ) {
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

export type Define = string | true;

export interface PreprocessorProperties {
    defines: Record<string, Define>;
}

export class Preprocessor implements PreprocessorProperties, Type {
    public defines: Record<string, Define> = {};

    public constructor(properties: Partial<PreprocessorProperties> = {}) {
        this.defines = properties.defines ?? this.defines;
    }

    private source: string = '';

    private replaceCarriageReturn(): this {
        let result: string = '';

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
        let result: string = '';

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

    private addToken(type: Keys<typeof TokenType>, value: string = ''): this {
        this.tokens.push({ type, value });

        return this;
    }

    private index: number = 0;

    private readChars(size: number): string {
        let result: string = '';

        for (let i = 0; i < size; ++i) {
            result += this.source[this.index + i];
        }

        this.index += size;
        return result;
    }

    private readWhile(
        predecate: (source: string, index: number, first: boolean) => boolean,
        updateIndex: boolean = true,
    ): string {
        let result: string = '';
        let index = this.index;

        let first = true;
        while (predecate(this.source, index, first) && index < this.source.length) {
            result += this.source[index++];
            first = false;
        }

        if (updateIndex) {
            this.index = index;
        }

        return result;
    }

    private readUntil(
        predecate: (source: string, index: number, first: boolean) => boolean,
        updateIndex: boolean = true,
    ): string {
        let result: string = '';
        let index = this.index;

        let first = true;
        while (!predecate(this.source, index, first) && index < this.source.length) {
            result += this.source[index++];
            first = false;
        }

        if (updateIndex) {
            this.index = index;
        }

        return result;
    }

    private readSpace(): this {
        const space = this.readWhile(isSpace);

        this.addToken(TokenType.SPACE, space);

        return this;
    }

    private readNewline(): this {
        const newline = this.readWhile(isNewline);
        this.addToken(TokenType.NEWLINE, newline);

        return this;
    }

    private readLineComment(): this {
        const comment = this.readUntil(isNewline);
        this.addToken(TokenType.COMMENT, comment);

        return this;
    }

    private readBlockComment(): this {
        const comment = this.readUntil(isBlockCommentEnd) + this.readChars(2);
        this.addToken(TokenType.COMMENT, comment);

        return this;
    }

    private readInteger(): this {
        const integer = this.readWhile(isInteger);
        this.addToken(TokenType.INTEGER, integer);

        return this;
    }

    private readIdentifier(): this {
        const identifier = this.readWhile(isIdentifier);
        this.addToken(TokenType.IDENTIFIER, identifier);

        return this;
    }

    private readExpression(): this {
        while (!isNewline(this.source, this.index) && this.index < this.source.length) {
            if (isSpace(this.source, this.index)) {
                this.readWhile(isSpace);
                continue;
            }

            if (matchString('(', this.source, this.index)) {
                this.addToken(TokenType.LEFT_ROUND_BRACKET, this.readChars(1));
                continue;
            }

            if (matchString(')', this.source, this.index)) {
                this.addToken(TokenType.RIGHT_ROUND_BRACKET, this.readChars(1));
                continue;
            }

            if (matchString('+', this.source, this.index)) {
                this.addToken(TokenType.PLUS, this.readChars(1));
                continue;
            }

            if (matchString('-', this.source, this.index)) {
                this.addToken(TokenType.MINUS, this.readChars(1));
                continue;
            }

            if (matchString('~', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_NEGATE, this.readChars(1));
                continue;
            }

            if (matchString('*', this.source, this.index)) {
                this.addToken(TokenType.MULTIPLY, this.readChars(1));
                continue;
            }

            if (matchString('/', this.source, this.index)) {
                this.addToken(TokenType.DIVIDE, this.readChars(1));
                continue;
            }

            if (matchString('%', this.source, this.index)) {
                this.addToken(TokenType.REMAINDER, this.readChars(1));
                continue;
            }

            if (matchString('<<', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_SHIFT_LEFT, this.readChars(2));
                continue;
            }

            if (matchString('>>', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_SHIFT_RIGHT, this.readChars(2));
                continue;
            }

            if (matchString('<', this.source, this.index)) {
                this.addToken(TokenType.LESS_THAN, this.readChars(1));
                continue;
            }

            if (matchString('>', this.source, this.index)) {
                this.addToken(TokenType.GREATER_THAN, this.readChars(1));
                continue;
            }

            if (matchString('<=', this.source, this.index)) {
                this.addToken(TokenType.LESS_THAN_EQUAL, this.readChars(2));
                continue;
            }

            if (matchString('>=', this.source, this.index)) {
                this.addToken(TokenType.GREATER_THAN_EQUAL, this.readChars(2));
                continue;
            }

            if (matchString('==', this.source, this.index)) {
                this.addToken(TokenType.EQUALS, this.readChars(2));
                continue;
            }

            if (matchString('!=', this.source, this.index)) {
                this.addToken(TokenType.NOT_EQUALS, this.readChars(2));
                continue;
            }

            if (matchString('&', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_AND, this.readChars(1));
                continue;
            }

            if (matchString('^', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_XOR, this.readChars(1));
                continue;
            }

            if (matchString('|', this.source, this.index)) {
                this.addToken(TokenType.BITWISE_OR, this.readChars(1));
                continue;
            }

            if (matchString('&&', this.source, this.index)) {
                this.addToken(TokenType.AND, this.readChars(2));
                continue;
            }

            if (matchString('||', this.source, this.index)) {
                this.addToken(TokenType.OR, this.readChars(2));
                continue;
            }

            if (isInteger(this.source, this.index)) {
                this.readInteger();
                continue;
            }

            if (isIdentifier(this.source, this.index, true)) {
                this.readIdentifier();
                continue;
            }

            break;
        }

        return this;
    }

    private readDefineDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.DEFINE_DIRECTIVE, directive);

        this.readWhile(isSpace);

        this.readIdentifier();

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        const replacement = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, replacement);

        this.readWhile(isSpace);

        return this;
    }

    private readUndefineDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.UNDEFINE_DIRECTIVE, directive);

        this.readWhile(isSpace);

        this.readIdentifier();

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readIfDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.IF_DIRECTIVE, directive);

        this.readExpression();

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readIfDefinedDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.IF_DEFINED_DIRECTIVE, directive);

        this.readWhile(isSpace);

        this.readIdentifier();

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readIfNotDefinedDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.IF_NOT_DEFINED_DIRECTIVE, directive);

        this.readWhile(isSpace);

        this.readIdentifier();

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readElseDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.ELSE_DIRECTIVE, directive);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readElseIfDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.ELSE_IF_DIRECTIVE, directive);

        this.readExpression();

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readEndIfDirective(): this {
        const directive = this.readUntil(isWhitespace);
        this.addToken(TokenType.END_IF_DIRECTIVE, directive);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readLineDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.LINE_DIRECTIVE, directive);

        this.readWhile(isSpace);

        const line = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, line);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        const file = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, file);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readIncludeDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.INCLUDE_DIRECTIVE, directive);

        this.readWhile(isSpace);

        const path = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, path);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readErrorDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.ERROR_DIRECTIVE, directive);

        this.readWhile(isSpace);

        const message = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, message);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readWarningDirective(): this {
        const directive = this.readUntil(isSpace);
        this.addToken(TokenType.WARNING_DIRECTIVE, directive);

        this.readWhile(isSpace);

        const message = this.readUntil(isWhitespace);
        this.addToken(TokenType.UNKNOWN, message);

        this.readWhile(isSpace);

        if (isNewline(this.source, this.index) || this.index >= this.source.length) {
            return this;
        }

        return this;
    }

    private readPragmaDirective(): this {
        this.readUntil(isNewline);

        this.addToken(TokenType.NEWLINE, '\n');

        return this;
    }

    private readUnknown(): this {
        const unknown = this.readChars(1);

        this.addToken(TokenType.UNKNOWN, unknown);

        return this;
    }

    private tokenize(): this {
        this.tokens = [];

        for (this.index = 0; this.index < this.source.length; ) {
            if (isSpace(this.source, this.index)) {
                this.readSpace();
                continue;
            }

            if (isNewline(this.source, this.index)) {
                this.readNewline();
                continue;
            }

            if (isLineComment(this.source, this.index)) {
                this.readLineComment();
                continue;
            }

            if (isBlockCommentStart(this.source, this.index)) {
                this.readBlockComment();
                continue;
            }

            if (isInteger(this.source, this.index)) {
                this.readInteger();
                continue;
            }

            if (isIdentifier(this.source, this.index, true)) {
                this.readIdentifier();
                continue;
            }

            if (isDefineDirective(this.source, this.index)) {
                this.readDefineDirective();
                continue;
            }

            if (isUndefineDirective(this.source, this.index)) {
                this.readUndefineDirective();
                continue;
            }

            if (isIfDirective(this.source, this.index)) {
                this.readIfDirective();
                continue;
            }

            if (isIfDefinedDirective(this.source, this.index)) {
                this.readIfDefinedDirective();
                continue;
            }

            if (isIfNotDefinedDirective(this.source, this.index)) {
                this.readIfNotDefinedDirective();
                continue;
            }

            if (isElseDirective(this.source, this.index)) {
                this.readElseDirective();
                continue;
            }

            if (isElseIfDirective(this.source, this.index)) {
                this.readElseIfDirective();
                continue;
            }

            if (isEndIfDirective(this.source, this.index)) {
                this.readEndIfDirective();
                continue;
            }

            if (isLineDirective(this.source, this.index)) {
                this.readLineDirective();
                continue;
            }

            if (isIncludeDirective(this.source, this.index)) {
                this.readIncludeDirective();
                continue;
            }

            if (isErrorDirective(this.source, this.index)) {
                this.readErrorDirective();
                continue;
            }

            if (isWarningDirective(this.source, this.index)) {
                this.readWarningDirective();
                continue;
            }

            if (isPragmaDirective(this.source, this.index)) {
                this.readPragmaDirective();
                continue;
            }

            this.readUnknown();
        }

        return this;
    }

    public processed: string = '';

    private internalDefines: Record<string, Define> = {};

    private get current(): Token {
        return this.tokens[this.index];
    }

    private consume(): Token {
        return this.tokens[this.index++];
    }

    private parseExpression(): Expression {
        while (this.current.type != TokenType.NEWLINE) {}

        return 0;
    }

    private evaluateExpression(expression: Expression = this.parseExpression()): number {
        if (expression instanceof UnaryExpression) {
            const value =
                typeof expression.value == 'number'
                    ? expression.value
                    : this.evaluateExpression(expression.value);

            switch (expression.operator) {
                case UnaryOperator.PLUS:
                    return +value;
                case UnaryOperator.MINUS:
                    return -value;
                case UnaryOperator.BITWISE_NEGATE:
                    return ~value;
                case UnaryOperator.NEGATE:
                    return !value ? 1 : 0;
            }
        }

        if (expression instanceof BinaryExpression) {
            const left =
                typeof expression.left == 'number'
                    ? expression.left
                    : this.evaluateExpression(expression.left);

            const right =
                typeof expression.right == 'number'
                    ? expression.right
                    : this.evaluateExpression(expression.right);

            switch (expression.operator) {
                case BinaryOperator.MULTIPLY:
                    return left * right;
                case BinaryOperator.DIVIDE:
                    return right == 0 ? 0 : Math.floor(left / right);
                case BinaryOperator.REMAINDER:
                    return left % right;
                case BinaryOperator.BITWISE_SHIFT_LEFT:
                    return left << right;
                case BinaryOperator.BITWISE_SHIFT_RIGHT:
                    return left >> right;
                case BinaryOperator.LESS_THAN:
                    return left < right ? 1 : 0;
                case BinaryOperator.GREATER_THAN:
                    return left > right ? 1 : 0;
                case BinaryOperator.LESS_THAN_EQUAL:
                    return left <= right ? 1 : 0;
                case BinaryOperator.GREATER_THAN_EQUAL:
                    return left >= right ? 1 : 0;
                case BinaryOperator.EQUALS:
                    return left == right ? 1 : 0;
                case BinaryOperator.NOT_EQUALS:
                    return left != right ? 1 : 0;
                case BinaryOperator.BITWISE_AND:
                    return left & right;
                case BinaryOperator.BITWISE_XOR:
                    return left ^ right;
                case BinaryOperator.BITWISE_OR:
                    return left | right;
                case BinaryOperator.AND:
                    return left && right;
                case BinaryOperator.OR:
                    return left || right;
            }
        }

        return expression;
    }

    private evaluateJump(): this {
        let scope = 0;

        while (++this.index < this.tokens.length) {
            if (this.current.type == TokenType.IF_DIRECTIVE) {
                scope += 1;
            }

            if (this.current.type == TokenType.IF_DEFINED_DIRECTIVE) {
                scope += 1;
            }

            if (this.current.type == TokenType.IF_NOT_DEFINED_DIRECTIVE) {
                scope += 1;
            }

            if (this.current.type == TokenType.ELSE_DIRECTIVE) {
                scope -= 1;

                if (scope < 0) {
                    break;
                }
            }

            if (this.current.type == TokenType.ELSE_IF_DIRECTIVE) {
                scope -= 1;

                if (scope < 0) {
                    break;
                }
            }

            if (this.current.type == TokenType.END_IF_DIRECTIVE) {
                scope -= 1;

                if (scope < 0) {
                    break;
                }
            }
        }

        return this;
    }

    private evaluateDefineDirective(): this {
        this.consume();

        const name = this.consume();

        if (this.current.type == TokenType.NEWLINE) {
            this.internalDefines[name.value] = true;
            return this;
        }

        const replacement = this.consume();

        this.internalDefines[name.value] = replacement.value;

        return this;
    }

    private evaluateUndefineDirective(): this {
        this.consume();

        const name = this.consume();

        delete this.internalDefines[name.value];

        return this;
    }

    private evaluateIfDirective(): this {
        this.consume();

        const expression = this.evaluateExpression();

        if (!expression) {
            this.evaluateJump();
        }

        return this;
    }

    private evaluateIfDefinedDirective(): this {
        this.consume();

        const name = this.consume();

        if (this.internalDefines[name.value]) {
            this.evaluateJump();
        }

        return this;
    }

    private evaluateIfNotDefinedDirective(): this {
        this.consume();

        const name = this.consume();

        if (!this.internalDefines[name.value]) {
            this.evaluateJump();
        }

        return this;
    }

    private evaluateElseDirective(): this {
        this.consume();

        return this;
    }

    private evaluateElseIfDirective(): this {
        this.consume();

        const expression = this.evaluateExpression();

        if (!expression) {
            this.evaluateJump();
        }

        return this;
    }

    private evaluateEndIfDirective(): this {
        this.consume();

        return this;
    }

    private evaluateLineDirective(): this {
        this.consume();

        const line = this.consume();

        if (this.current.type == TokenType.STRING) {
            const file = this.consume();
        }

        return this;
    }

    private evaluateIncludeDirective(): this {
        this.consume();

        const path = this.consume();

        return this;
    }

    private evaluateErrorDirective(): this {
        this.consume();

        const message = this.consume();

        return this;
    }

    private evaluateWarningDirective(): this {
        this.consume();

        const message = this.consume();

        return this;
    }

    private evaluateUnknown(): this {
        const token = this.consume();

        const define = this.internalDefines[token.value];

        this.processed += define ? define : token.value;

        return this;
    }

    private evaluate(): this {
        this.processed = '';

        this.internalDefines = { ...this.defines };

        for (this.index = 0; this.index < this.tokens.length; ) {
            switch (this.current.type) {
                case TokenType.DEFINE_DIRECTIVE:
                    this.evaluateDefineDirective();
                    break;
                case TokenType.UNDEFINE_DIRECTIVE:
                    this.evaluateUndefineDirective();
                    break;

                case TokenType.IF_DIRECTIVE:
                    this.evaluateIfDirective();
                    break;
                case TokenType.IF_DEFINED_DIRECTIVE:
                    this.evaluateIfDefinedDirective();
                    break;
                case TokenType.IF_NOT_DEFINED_DIRECTIVE:
                    this.evaluateIfNotDefinedDirective();
                    break;
                case TokenType.ELSE_DIRECTIVE:
                    this.evaluateElseDirective();
                    break;
                case TokenType.ELSE_IF_DIRECTIVE:
                    this.evaluateElseIfDirective();
                    break;
                case TokenType.END_IF_DIRECTIVE:
                    this.evaluateEndIfDirective();
                    break;

                case TokenType.LINE_DIRECTIVE:
                    this.evaluateLineDirective();
                    break;

                case TokenType.INCLUDE_DIRECTIVE:
                    this.evaluateIncludeDirective();
                    break;

                case TokenType.ERROR_DIRECTIVE:
                    this.evaluateErrorDirective();
                    break;
                case TokenType.WARNING_DIRECTIVE:
                    this.evaluateWarningDirective();
                    break;

                default:
                    this.evaluateUnknown();
                    break;
            }
        }

        return this;
    }

    public process(source: string): this {
        this.source = source;

        this.replaceCarriageReturn();
        this.escapeNewlines();

        this.tokenize();

        this.evaluate();

        return this;
    }

    public get objectClassName(): string {
        return 'Preprocessor';
    }

    public label: string = '';
}
