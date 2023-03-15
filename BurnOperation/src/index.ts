import { Server, ServerApi, Operation } from "@abx/js-kinesis-sdk"; // "stellar-sdk";
const server = new Server("https://devnet.kinesisgroup.io");
//const server = new Server("https://horizon-testnet.stellar.org");
const custodianId = "GBGNSAQAU7HZLE7SPR6LCY3LSORD2TV3I2Y647LDUIE2CCKKOALOKEP6"; //"GAHYA5Z4UWR6Z552XNWVYXXLM6CIU5OV3CT5BB2OQ4A2U5UZ4V6T6K3V";
const tx_hash = "hfNDHmFPRHrN/uSVBlwnSfYvNCwT3Or2tfutVumX6H8="; //"TEST"; //"dswHXagyk/Y7mjm+a04/kUGm08aYpubPGvzsmatwA6s=";
const creationDate = new Date("2023-02-28T05:35:58Z"); //("2023-02-17 00:58:08 UTC");//  "created_at": "2023-02-28T05:35:58Z",

async function hasBurnOperationAlreadyHappened(
  custodianId: string,
  tx_hash: string,
  creationDate: Date
) {
  let operations = await server
    .operations()
    .forAccount(custodianId)
    .order("desc")
    .call();
  //  console.log(operations);
  let burnOperationExists = false;
  while (operations.records.length) {
    for (let i = 0; i < operations.records.length; i++) {
      console.log(operations.records.length);
      console.log("i: ", i);
      const record = operations.records[i];
      if (
        new Date(record.created_at) >= creationDate &&
        record.type === "payment" &&
        //record.asset_type === "native" &&
        record.source_account === custodianId
      ) {
        console.log("checkpoint 1=====");
        const tx = await record.transaction();
        if (tx.memo === tx_hash) {
          console.log("checkpoint 2 ---", tx.memo);
          burnOperationExists = true;
          break;
        }
      }
    }
    if (burnOperationExists) break;
    operations = await operations.next();
  }
  console.log("found: " + burnOperationExists);
  return burnOperationExists;
}

hasBurnOperationAlreadyHappened(custodianId, tx_hash, creationDate);

//==========end of code===============
// while (operations.records.length) {
//   operations.records.forEach(async (record) => {
//     let burnOperationExists = false;
//     if (
//       new Date(record.created_at) >= creationDate &&
//       record.type === "payment" &&
//       record.asset_type === "native" &&
//       record.source_account === custodianId
//     ) {
//       const tx = await record.transaction();
//       if (tx.memo === tx_hash) {
//         console.log(" found memo", record.transaction_hash);
//         burnOperationExists = true;
//         //console.log("TRUE: ", tx.memo);
//         return burnOperationExists;
//       }
//     }
//   });
//   if (!burnOperationExists) operations = await operations.next();
// }
// return burnOperationExists;
//}

//====================================================================
//=====================================================================
//=====================================================================

//   while (operations.records.length) {
//     const relevantOperations: BurnRecord[] = operations.records.filter(
//       async (record) => {
//         const transaction = await record.transaction()
//         const  relevantMemo =
//           record.transaction_hash === tx_hash;
//         const relevantDate =
//           new Date(record.created_at) >= new Date(creationDate);
//         const relevantCustodian = [
//           record.source_account === custodianId,
//         ].some(Boolean);
//         return relevantMemo && relevantDate && relevantCustodian;
//       }
//     );
//     const burnOperations = relevantOperations.filter(
//       (op) =>
//         op.type === "payment" && op.asset_type === "native" && op.to === "burn"
//     );

//     if (burnOperations.length > 0) {
//       console.log("found");
//       return true;
//     }
//     operations = await operations.next();
//   }
// }
//----------------------------------------------------------------------------------------
//console.log(transactions);
//         while (hData.records.length)
//         {
//                 const relevantData : BurnRecord[] = hData.records;
//                 let f : Operation[] = hData.records.filter((record)=>{

//                 })

//                 .filter((record)=>{
//                         if (record.source_account === custodianId && record.transaction_hash)
//                 })
//         }
//         }

// const fetchHistory = async () => {
//    let hData = await server.operations().forAccount(custodianId).order("desc").call();//.then(function (page) {
//         console.log(hData);

// while (hData.records.length)
// {
//         hData.records
//         .filter((record) => record.source_account===custodianId)
//        /* .forEach((record) => {
//                 const transactionHash = record.transaction_hash;
//                 const transactionId = record.id;
//                 const transactionCreationdate =  record.created_at;

//                 const transactionData = {
//                         id: transactionId,
//                         hash: transactionHash,
//                         creationData: transactionCreationdate,

//                 };
//                 transactionRecord[transactionId]=transactionData;
//         });*/

// //};
// hData = await hData.next();

// }
//         //let page = await hData;
// fetchHistory();
// //2023-03-02 06:25:27 UTC
// //tx hash- burn3

// }
// //let page = await ;

// //while (page.)
