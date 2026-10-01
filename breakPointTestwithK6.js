import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
  stages: [
    { 
        target: 10000,
        duration: '1h'
    
    }
   
  ],
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Sleep for 1 second between requests
  
  
}