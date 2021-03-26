/**
 * @description 用户资源列表
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = [];

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.get(backEndUrl + '/resource/user/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  return result;
}
