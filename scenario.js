import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';
import exec from 'k6/execution';
import {Counter} from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '10s',  
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
    http_reqs : ['count>100'], // At least 100 requests should be made
    vus_max: ['value>9'],// Maximum number of virtual users should be less than 10
    checks: ['rate>0.95'] // At least 95% of checks should pass
  },
}

let myCounter = new Counter('my_counter');


export default function () {
    const res = http.get('https://quickpizza.grafana.com/' + (exec.scenario.iterationInTest === 1 ? 'foo' : ''));
    myCounter.add(1);
    console.log(exec.scenario.iterationInTest);
    check(res, {
        'Status code is 200': (r) => r.status === 200,
         'Response body contains': (r) => r.body.includes('QuickPizza') === true
    });  
    sleep(2); // Sleep for 1 second between requests 

    //  console.log(res.body); // Log the response body
}