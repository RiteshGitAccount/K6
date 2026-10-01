import http from 'k6/http';


export const options = {
  
  thresholds: {
   
    http_req_duration: ['p(95)<400'] ,
   
    'http_req_duration{status:200}': ['p(95)<400']
  },
}



export default function () {
 http.get('https://reqres.in/api/users?page=2');
 http.post('https://reqres.in/api/users', JSON.stringify({
   name: 'John Doe',
   job: 'Software Engineer'
 }));
 
}