import mockjs from 'mockjs';
import { portfolioData } from './mock/portfolio';
import { userData } from './mock/user';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const randomPick = (data, empty) => {
  if (Math.random() > 0.5) return data;
  return empty;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/members/:memberId': (req, res) => res.send({ ...userData, id: req.params.memberId }),
  'GET /api/v2/members/portfolio': (req, res) => res.send(randomPick(portfolioData, [])),
  'POST /api/v2/members/identity-verification': {},
  'POST /api/v2/members/whitelist/add': {},
};

export default (noProxy ? {} : delay(proxy, 3000));
