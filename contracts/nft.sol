// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "base64-sol/base64.sol";

contract JBlock is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event CreatedNFT(uint256 indexed tokenId, string tokenURI);

    constructor() public ERC721("JBlock", "ArtBlock") {}

    function mintNFT(string memory html)
        public onlyOwner
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);

        //get the token URI
        string memory tokenURI = htmlToTokenURI(html);

        _setTokenURI(newItemId, formatTokenURI(tokenURI));
        emit CreatedNFT(newItemId, tokenURI);
    }

    function htmlToTokenURI(string memory html) public pure returns (string memory) {
        // https://www.w3.org/html/
        // data:text/html;base64,<HTML HERE>
        string memory baseURL = "data:text/html;base64,";
        string memory htmlBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(html))));
        return string(abi.encodePacked(baseURL,htmlBase64Encoded));
        //return string(htmlBase64Encoded);
    }

    function formatTokenURI(string memory tokenURI) public pure returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"','ArtBlock HTML NFT','", "description":"An NFT based on HTML!", "attributes":"", "html":"',tokenURI,'"}'
                            )
                        )
                    )
                )
            );
    }
}



