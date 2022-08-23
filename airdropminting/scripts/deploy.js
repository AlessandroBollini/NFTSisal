async function main() {
  const YenToken = await hre.ethers.getContractFactory("YenToken");
  const nft = await YenToken.deploy();

  await nft.deployed();

  console.log("YenToken deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
