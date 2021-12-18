//nft-test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

let jBlock;
let hardhatToken;
let html = "<html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>";

beforeEach(async function(){
	jBlock = await ethers.getContractFactory("JBlock");
	[owner, addr1, addr2, ...addrs] = await ethers.getSigners();

	hardhatToken = await jBlock.deploy();
});

describe("JBlock", function(){
	it("Return encoded Base64 string", async function(){
		expect(await hardhatToken.htmlToTokenURI(html)).to.equal("data:text/html;base64,PGh0bWw+PGhlYWQ+PHRpdGxlPkV4YW1wbGU8L3RpdGxlPjwvaGVhZD48Ym9keT48cD5UaGlzIGlzIGFuIGV4YW1wbGUgb2YgYSBzaW1wbGUgSFRNTCBwYWdlIHdpdGggb25lIHBhcmFncmFwaC48L3A+PC9ib2R5PjwvaHRtbD4=");
	});
});

describe("JBlock", function(){
	it("Return encoded Token URI", async function(){
		expect(await hardhatToken.formatTokenURI("PGh0bWw")).to.equal('data:application/json;base64,eyJuYW1lIjoiQXJ0QmxvY2sgSFRNTCBORlQiLCAiZGVzY3JpcHRpb24iOiJBbiBORlQgYmFzZWQgb24gSFRNTCEiLCAiYXR0cmlidXRlcyI6IiIsICJodG1sIjoiUEdoMGJXdyJ9');
	});
});


describe("JBlock", function(){
	it("Mint NFT", async function(){
		expect(await hardhatToken.mintNFT(html)).to.emit(hardhatToken,'CreatedNFT');
		});
	it("check owner", async function(){
		expect(await hardhatToken.owner()).to.equal(await owner.address);
	});
	/*it("check other users can't mint", async function(){
		expect(await hardhatToken.connect(addr1).mintNFT(html).to.rejectedWith(Error,"Not Owner"));
	});*/
});

//Original String:
//<html><head><title>Example</title></head><body><p>This is an example of a simple HTML page with one paragraph.</p></body></html>
//Expected TokenURI:
// {"name":"ArtBlock HTML NFT", "description":"An NFT based on HTML!", "attributes":"", "html":"PGh0bWw"}
