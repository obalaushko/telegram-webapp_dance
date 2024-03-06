import { useQuery } from 'react-query';

export const useFetch = (url: string) => {
    return useQuery(url, () =>
        fetch(url).then((res) =>
            res.ok ? res.json() : Promise.reject('Error')
        )
    );
};
