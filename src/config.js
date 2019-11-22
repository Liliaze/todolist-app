export const Environment = {
    Dev: 'DEV',
    Prod: 'PROD'
};


const Config = {
    rootHtmlElementId: 'app_root',
    env: Environment.Dev,
    get ApiBaseUrl() {
        return {
            [Environment.Dev]: 'http://localhost/medialis/todolist/api/',
            [Environment.Prod]: 'https://www.medialis.com/todolist/api/',
        }[Config.env];
    }
};

export default Config;
