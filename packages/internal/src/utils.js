import ora from 'ora';
import prettyMilliseconds from 'pretty-ms';
import pc from 'picocolors';
import { homedir } from 'node:os';
import { normalize, resolve, sep } from 'node:path';

/**
 * @template T
 * @param {string} message
 * @param {() => Promise<T>} task
 * @returns {Promise<[T, number]>}
 */
export async function printAsyncTask(message, task) {
    const spinner = ora({
        spinner: 'simpleDotsScrolling',
        prefixText: `${pc.magenta('→')} ${message}`,
    }).start();

    const startTime = performance.now();

    let result;

    try {
        result = await task();
    } catch (e) {
        spinner.fail(pc.red('Failed'));

        throw e;
    }

    const endTime = performance.now();

    const duration = endTime - startTime;
    spinner.stopAndPersist({
        symbol: pc.green(`[${prettyMilliseconds(duration)}]`),
    });

    return [result, duration];
}

/**
 * @param {string} description
 * @param {number} progress
 * @param {string} label
 * @param {(input: string | number) => string} color
 * @param {number} width
 */
export function printBarChart(description, progress, label, color, width = 45) {
    const progressClamped = Math.min(progress, 1);
    const progressOverflowed = progress > 1;

    const filledBars = color(
        '❚'.repeat(
            Math.ceil(progressClamped * width) - (progressOverflowed ? 1 : 0),
        ),
    );
    const emptyBars = pc.gray(
        '❚'.repeat(Math.floor((1 - progressClamped) * width)),
    );
    const overflowBar = pc.red(progressOverflowed ? '❚' : '');
    const coloredLabel = progressOverflowed ? pc.red(label) : color(label);

    printInfo(
        `${description} ${filledBars}${emptyBars}${overflowBar} ${coloredLabel}`,
    );
}

/**
 * @param {string} message
 */
export function printInfo(message) {
    console.log(`${pc.blue('→')} ${message}`);
}

/**
 * @param {string} message
 */
export function printSuccess(message) {
    console.log(`${pc.green('→')} ${message}`);
}

/**
 * @param {string} path
 */
export function prettyfiyPath(path) {
    path = normalize(resolve(path));
    const homePath = normalize(homedir() + sep);

    if (path.startsWith(homePath)) {
        path = path.slice(homePath.length);
        return `~${sep}${path}`;
    }

    return path;
}

/**
 * @param {string[]} files
 */
export function getFilesSize(files) {
    const blob = new Blob(files);

    return blob.size;
}
