# Simple RazorPay Backend
## Setup Instructions
- ### Clone the project Locally.
- ### Rename the file ```example.env``` to ```.env```
- ### Change the Environment variables in the ```.env``` file accordingly.
  ```env
  KEY_ID="<Your KEY ID>"
  KEY_SECRET="<Your KEY SECRET>"
  REDIS_URL="rediss://<username>:<Password>@<host>:<port>"
  REDIS_QUEUE="<Queue Name>"
  REACT_APP_BASEURL=<C2M API Base URL>
  REACT_APP_C2MUSER=<C2M Username>
  REACT_APP_C2MPASSWORD=<C2M Password>```

- ### In the Terminal run the command ```npm install```
- ### Now run ```npm start```
    - This will start the server at port ```3000```
