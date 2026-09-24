import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
  stages: [
    { duration: '1m', target: 30 }// Ramp up to 10 users over 1 minute   
   
  ],
};

export default function () {
    http.get('https://test.k6.io');
  
}