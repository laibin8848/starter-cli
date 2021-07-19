import {version, command} from '../../package.json';

export const VERSION = version;

export const COMMAND = command;

const HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

export const RC = `${HOME}/.${COMMAND}rc`;

export const DEFAULTS = {
    registry: 'vite-vue3-template',
    user: 'laibin8848'
}
