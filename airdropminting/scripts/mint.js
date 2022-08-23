const wController = require('../controllers/WalletController');
const Upload = require('../ipfs/upload');

// const existingContractAddr = "0x8ac104032359d70c981fbfd635ad140adbb5198c";

const existingContractAddr = "0x83d24ad281eeB00238356c5e1AAB16793C7C1ea4";

async function main() {
  const friends = await wController.findAllAddresses();
  const tokenURIs = await Upload.upload();
  const nft = await hre.ethers.getContractAt("YenToken", existingContractAddr);
  const signer0 = await ethers.provider.getSigner(0);
  const nonce = await signer0.getTransactionCount();
  console.log(0);
  for (let i = 0; i <friends.length; i++) {
    console.log(i);
    await nft.awardItem(friends[i], tokenURIs.results[i], {
      nonce: nonce + i
    });
    await wController.setImage(friends[i],tokenURIs.uris[i]);
    console.log(11);
  }
  console.log(nonce);
  console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
