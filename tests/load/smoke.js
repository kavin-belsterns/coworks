// k6 smoke test. Run against a started app: BASE_URL=http://localhost:3000 npm run test:load
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export default function smoke() {
  const response = http.get(`${baseUrl}/api/v1/health`);
  check(response, { 'status is 200': (r) => r.status === 200 });
}
