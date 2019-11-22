export function fetcher(baseUrl) {
    return {
        async fetchJson(query) {
            const requestInit = {
                method: query.method,
                headers: {
                    ...query.headers,
                    'Content-Type': 'application/json',
                },
                body: query.body ? JSON.stringify(query.body) : undefined,
            };
            const response = await fetch(baseUrl + query.path, requestInit);

            if (response.ok) {
                const result = await response.json();

                return result;
            } else {
                const error = new Error(response.statusText);
                error.response = response;

                throw error;
            }
        }
    };
}