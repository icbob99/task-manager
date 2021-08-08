
console.log(process.env.SENDGRID_API_KEY)  

if (process.env.NODE_ENV !== 'production') {
    const result =require('dotenv').config();
    if (result.error) {
        throw result.error
      }
      
      console.log(result.parsed)
      
    console.log(process.env);
  }

console.log(process.env.SENDGRID_API_KEY)  
console.log(process.env.DB_HOST)  
console.log(process.env.DB_USER)  
console.log(process.env.DB_PASS)  
console.log(process.env.HELLO_WORD)  