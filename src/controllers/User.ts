import { EventMethods, EventRoutes } from '../typing/Event';
import { AppResponse } from '../typing/Response';
import { withEventName } from '../utils/withEventName';
import { withResponseBuilder } from '../utils/withResponseBuilder';

const getAllController = async (): Promise<AppResponse> => {
  const result = await new Promise<AppResponse>((resolve) =>
    resolve({
      statusCode: 200,
      responseBody: [],
    }),
  );

  return result;
};

export const getAll = withEventName(
  `${EventRoutes.USERS}:${EventMethods.GET}`,
  withResponseBuilder(getAllController),
);
