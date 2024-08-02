const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Swisstronik = await ethers.getContractFactory('Swisstronik');
  const swisstronik = await Swisstronik.deploy();
  await swisstronik.waitForDeployment(); 
  console.log('Non-proxy Swisstronik deployed to:', swisstronik.target);
  fs.writeFileSync("contract.txt", swisstronik.target);

  const upgradedSwisstronik = await upgrades.deployProxy(Swisstronik, ['Hello Swisstronik from Happy Cuan Airdrop!!'], { kind: 'transparent' });
  await upgradedSwisstronik.waitForDeployment(); 
  console.log('Proxy Swisstronik deployed to:', upgradedSwisstronik.target);
  fs.writeFileSync("proxiedContract.txt", upgradedSwisstronik.target);

  console.log(`Deployment transaction hash: https://explorer-evm.testnet.swisstronik.com/address/${upgradedSwisstronik.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
