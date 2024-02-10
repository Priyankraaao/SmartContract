const http = require("http");
const Web3 = require("web3");

const server = http.createServer((req, res) => {
  const web3 = new Web3("http://localhost:3000");

  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "claimer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Claim",
      type: "event",
    },
  ];

  const contractAddress = "0x7870fc5dba3251295077970b6e1425da62a8cdf9";

  const contract = new web3.eth.Contract(contractABI, contractAddress);
  res.writeHead(200, { "Content-Type": "text/plain" });
  

  contract.getPastEvents(
    "Claim",
    {
      fromBlock: 0,
      toBlock: "latest",
    },
    (error, events) => {
      if (!error) {
        const decodedEvents = events.map((event) => event.returnValues);
      
        console.log(JSON.stringify(decodedEvents, null, 2));
        res.end(JSON.stringify(decodedEvents, null, 2));
      } else {
        console.error("Error fetching events:", error);
        res.end("Error fetching events:", error);
      }
    }
  );

 
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
