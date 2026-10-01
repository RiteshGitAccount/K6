import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get('https://www.flipkart.com/mobile-phones-store?pageUID=1790343638964');

  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Response contains OrderID': (r) => r.body.includes('Order'),
  }, { page: 'order' });   // <-- Tag
}