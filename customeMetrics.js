import http from 'k6/http';
import {Counter, Trend} from 'k6/metrics';

export const options = {
  vus: 5,
  duration: '5s',  
  thresholds: {
    http_req_duration: ['p(95)<300'], // 95% of requests should be below 500ms
    my_counter: ['count>10'], // At least 10 requests should be made
    response_time_news_page: ['p(95)<500' , 'p(99)<200'] // 95% of requests to the news page should be below 500ms
  },
}

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    let res = http.get('https://blazedemo.com/');
    myCounter.add(1);
    sleep(1); // Sleep for 1 second between requests
    res = http.get('https://blazedemo.com/purchase.php');
    newsPageResponseTrend.add(res.timings.duration);
}