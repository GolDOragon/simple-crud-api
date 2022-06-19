import { UserService } from '../services/UserService';
import { EventMethods, EventRoutes } from '../types/Event';
import { IController } from '../types/Interfaces';
import { STATUS_CODE } from '../utils/constants';
import { getId, isValidId } from '../utils/UUID';
import { withEventName } from '../utils/withEventName';
import { ControllerError } from './ControllerError';

const userService = new UserService();

const getController: IController = async (req) => {
  const id = getId(req.url);

  if (id && !isValidId(id)) {
    throw new ControllerError(STATUS_CODE.BAD_REQUEST, 'Invalid id');
  }

  const responseBody = id ? await userService.getUser(id) : await userService.getUsers();

  return {
    statusCode: STATUS_CODE.OK,
    responseBody,
  };
};

export const get = withEventName(`${EventRoutes.USERS}:${EventMethods.GET}`, getController);

const postController: IController = async (req, res, parsedBody) => {
  const responseBody = await userService.createUser(parsedBody);

  return {
    statusCode: STATUS_CODE.CREATED,
    responseBody,
  };
};

export const post = withEventName(`${EventRoutes.USERS}:${EventMethods.POST}`, postController);

const putController: IController = async (req, res, parsedBody) => {
  const id = getId(req.url);

  if (!id || !isValidId(id)) {
    throw new ControllerError(STATUS_CODE.BAD_REQUEST, 'Invalid id');
  }

  const responseBody = await userService.updateUser(id, parsedBody);

  return {
    statusCode: STATUS_CODE.OK,
    responseBody,
  };
};

export const put = withEventName(`${EventRoutes.USERS}:${EventMethods.PUT}`, putController);

const deleteController: IController = async (req) => {
  const id = getId(req.url);

  if (!id || !isValidId(id)) {
    throw new ControllerError(STATUS_CODE.BAD_REQUEST, 'Invalid id');
  }

  const responseBody = await userService.deleteUser(id);

  return {
    statusCode: STATUS_CODE.NO_CONTENT,
    responseBody,
  };
};

export const deleteMethod = withEventName(
  `${EventRoutes.USERS}:${EventMethods.DELETE}`,
  deleteController,
);
