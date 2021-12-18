// scripts/index.js
async function main () {
	const provider = await ethers.getDefaultProvider();
	const {abi} = require('../artifacts/contracts/nft.sol/JBlock.json');
	const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const [owner] = await ethers.getSigners();

	//console.log(abi);

	//connect to contract
	var contract = new ethers.Contract(address, abi, owner);

	//set up wallet
	/*var privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
	var wallet = new ethers.Wallet(owner, provider);
	var contractWithSigner = contract.connect(wallet);*/

	var tx = await contract.mintNFT('<html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>');
	var receipt = await tx.wait();


	/*contract.on("CreatedNFT", (setter, tokenURI, event)=> {
		console.log("tokenURI: ", tokenURI);
	})*/

	console.log(receipt.events?.filter((x) => {return x.event == "Transfer"}));

	/*
	
  // Retrieve accounts from the local node
	const accounts = await ethers.provider.listAccounts();
	const httpProvider = new ethers.providers.JsonRpcProvider();
	console.log(accounts);

	// Set up an ethers contract, representing our deployed instance
	const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const Block = await ethers.getContractFactory('JBlock');
	const block = await Block.attach(address);

	var abi = require('../artifacts/contracts/nft.sol/JBlock.json');

	var contract = new ethers.Contract(address, block.interface, httpProvider);

	//set up wallet and connect
	var privateKey = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
	var wallet = new ethers.Wallet(address, httpProvider);

	var contractWithSigner = contract.connect(wallet);

	var tx = await contractWithSigner.mintNFT('<html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>');
	await tx.wait();

	contract.on("CreatedNFT", (setter, tokenURI, event)=> {
		console.log("tokenURI: ", tokenURI);
	})

	//// version 2
	const signer = accounts[0];
	const htmlNFT = new ethers.Contract(address, Block.interface, signer);

	console.log(`Verify with:\n npx hardhat verify --network localhost ${htmlNFT.address}`);

	const value = await block.mintNFT('<html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>');
	console.log('Box value is', value);

	await value.wait(1);

	console.log(`You can view the tokenURI here ${await htmlNFT.tokenURI(0)}`)
	/// version 1
	
	var abi = require('../artifacts/contracts/nft.sol/JBlock.json');
	var ClientReceipt = web3.eth.contract(abi);
	var clientReceiptContract = ClientReceipt.at('0x5FbDB2315678afecb367f032d93F642f64180aa3');

	var event = clientReceiptContract.Deposit(function(error, result) {
	   if (!error)console.log(result);
	});*/

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });