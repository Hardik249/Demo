const http = require('http');
const route = require('./route');
const server = http.createServer(route);

const PORT = process.env.PORT || 3002;
// const { API_PORT } = process.env.PORT || 3003;
// const PORT = process.env.PORT || API_PORT;

route.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
