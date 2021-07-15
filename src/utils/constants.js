import {version} from '../../package.json';

export const VERSION = version;

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const RC = `${HOME}/.yue-clirc`;

export const DEFAULTS = {
    registry: 'vite-vue3-template',
    user: 'laibin8848'
}
