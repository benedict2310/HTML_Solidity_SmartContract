// scripts/index.js
async function main () {
  // Retrieve accounts from the local node
	const accounts = await ethers.provider.listAccounts();
	console.log(accounts);

	// Set up an ethers contract, representing our deployed Box instance
	const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const Block = await ethers.getContractFactory('JBlock');
	const block = await Block.attach(address);

	const value = await block.mintNFT('0x5FbDB2315678afecb367f032d93F642f64180aa3','0xthisisatest');
	console.log('Box value is', value.toString());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });