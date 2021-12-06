// scripts/deploy.js
async function main () {
  // We get the contract to deploy
  const JBlock = await ethers.getContractFactory('JBlock');
  console.log('Deploying JBlock...');
  const block = await JBlock.deploy();
  await block.deployed();
  console.log('JBlock deployed to:', block.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });