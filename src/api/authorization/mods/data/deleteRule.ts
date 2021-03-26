/**
 * @description 删除数据规则
 */

import serverConfig from '../../../../../server.config';
import { initRequest } from '../../../../common';

const backEndUrl = serverConfig()['authorization'];

export const init = undefined;

export async function fetch(params = {}) {
  const request = await initRequest();
  const result = await request.post(backEndUrl + '/data/rule/delete', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params,
  });
  return result;
}
