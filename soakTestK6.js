import http from 'k6/http';
import { sleep } from 'k6'; 

export const options = {
  stages: [
    
        { duration: '100s', target: 1000 }, 
         { duration: '12h', target: 1000 }, 
          { duration: '10s', target: 0 }
      
   
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