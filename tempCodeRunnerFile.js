app.post("/", async (req, res) => {
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