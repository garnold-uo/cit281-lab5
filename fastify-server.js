const fastify = require("fastify")();

let students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    },
];

fastify.get("/cit/student", function (request, reply) {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send([students]);
});

fastify.get("/cit/student/:id", function (request, reply) {
  const { id } = request.params; 
  let student = null;
  for ( const item of students) {
    if (item.id === parseInt(id)) {
      student = item;
      break;
    }
  }

  if (!student) {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Not Found");
  }
  else {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send([student]);
  }
});

fastify.get("*", function (request, reply) {
  reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Unsupported request or page");
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, function (err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});