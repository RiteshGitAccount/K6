import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
  stages: [
    { 
        target: 1,
        duration: '30s'
    
    }// Ramp up to 10 users over 1 minute   
   
  ],
};

export default function () {
    http.get('https://test.k6.io');
    sleep(1); // Sleep for 1 second between requests
    http.get('https://test.k6.io/contacts.php');
    sleep(1); // Sleep for 1 second between requests
    http.get('https://test.k6.io/news.php');
    sleep(1); // Sleep for 1 second between requests
  
}