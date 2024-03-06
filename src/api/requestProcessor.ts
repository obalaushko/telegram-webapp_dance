import { useQuery, useMutation, useQueryClient, QueryKey, QueryFunction, MutationFunction, QueryOptions, MutationOptions } from 'react-query';

export function UseRequestProcessor() {
  const queryClient = useQueryClient();

  function Query(key: QueryKey, queryFunction: QueryFunction, options: QueryOptions = {}) {
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function Mutate(key: QueryKey, mutationFunction: MutationFunction, options: MutationOptions = {}) {
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { Query, Mutate };
}
