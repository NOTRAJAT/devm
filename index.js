const createKeccakHash = require("keccak");

const {ethers} = require("ethers");
require("dotenv").config();
const API_URL = "https://volta-rpc.energyweb.org/"; //machine address
const PRIVATE_KEY ="b33f3ac3769c1ab43c21545e9ea6ce12af833d8ed1fa0535e20996287cd99445"; //metamask api
const contractAddress = "0x45cA60AE78D86544c7d7dBd65EFF39cD49B933eD";


const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require("./artifacts/contracts/EVM.sol/VotingBlock.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

const express = require("express");
const app = express();
app.use(express.json());

// app.post("/", async (req, res) => {
//   try {
//     // res.sendStatus(200);
//     const { V, P } = req.body;
//     console.log(req.body);
//     tx = await contractInstance.Vote_init(toChecksumAddress(V), P);
//     // await tx.wait();
//     res.send(tx.hash);
//   } catch (error) {
//     res.status(500);
//     console.log(error.message);
//   }
// });

app.post(
  "/",
  async (req, res) => {
    try{
    const { V, P } = req.body;
    console.log(V,P);
    tx = await contractInstance.Vote_init(toChecksumAddress(V), P);
    tx.wait();
    console.log(req.headers.host,req.headers["user-agent"],)
    res.send(tx);}
     catch{
    (err) => console.log(err)
  }
  }
 
);
app.post("/new", async (req, res) => {
  (err) => console.log(err);
  try {
    const { V } = req.body;
    console.log(req.body);
    tx = await contractInstance.Add_Voter_address(toChecksumAddress(V));
    await tx.wait();
    res.send(tx.hash);
    console.log(req.headers.host,req.headers["user-agent"],)
  } catch (error) {
    res.status(500);
    //console.log(error.message);
  }
});
app.get("/", async (req, res) => {
  try {
    let a = [];
    const VoterCount = await contractInstance.count();
    VoterCount.map((obj) => {
      a.push(parseInt(obj._hex.substring(2), 10));
    });
    res.send(a);
    console.log(req.headers.host,req.headers["user-agent"],)
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

const port = 3000;
app.listen(port, "0.0.0.0", () => {
 
  console.log("API server is listening on port 3000");
});

function toChecksumAddress(address) {
  address = address.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}
