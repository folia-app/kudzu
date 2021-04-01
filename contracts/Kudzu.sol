pragma solidity ^0.6.8;

import "./Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * The FoliaVirus contract does this and that and doesn't stop.
 */

contract Kudzu is ERC721, Ownable {
    Metadata public metadata;
    constructor(Metadata _metadata) public ERC721("FoliaVirus", "FLV") {
        metadata = _metadata;
        _mint(msg.sender, 1);
    }
    function updateMetadata(Metadata _metadata) public onlyOwner {
        metadata = _metadata;
    }
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(balanceOf(from) == 1, "NOT YET INFECTED");
        require(balanceOf(to) == 0, "ALREADY INFECTED");
        _mint(to, totalSupply() + 1);
    }
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {}
}
