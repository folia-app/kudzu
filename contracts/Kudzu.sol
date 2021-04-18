pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Metadata.sol";

/**
 * The FoliaVirus contract does this and that and doesn't stop.
 */

contract Kudzu is ERC721, Ownable {
    Metadata public metadata;

    event Infect(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor(Metadata _metadata) public ERC721("FoliaVirus", "FLV") {
        metadata = _metadata;
        uint256 tokenId = 1;

        tokenId = tokenId << 8;
        tokenId = tokenId | pseudoRNG(32, 1);

        tokenId = tokenId << 8;
        tokenId = tokenId | pseudoRNG(32, 2);
        _mint(msg.sender, tokenId);
        emit Infect(address(0), msg.sender, tokenId);
    }
    function getPiecesOfTokenID(uint256 tokenId) public pure returns(uint256 id, uint256 eyes, uint256 mouth) {
        return (tokenId >> 16, (tokenId >> 8 & 0xFF), tokenId & 0xFF);
    }
    function updateMetadata(Metadata _metadata) public onlyOwner {
        metadata = _metadata;
    }
    function transferFrom(address from, address to, uint256 parentId) public virtual override {
        require(balanceOf(from) == 1, "NOT YET INFECTED");
        require(balanceOf(to) == 0, "ALREADY INFECTED");
        uint256 tokenId = totalSupply() + 1;
        tokenId = tokenId << 8;
        if (pseudoRNG(2, 1) == 0) {
            //inherit eyes
            tokenId = tokenId | (parentId >> 8 & 0xFF);
            tokenId = tokenId << 8;
            tokenId = tokenId | pseudoRNG(32, 2);
        } else {
            //inherit mouth
            tokenId = tokenId | pseudoRNG(32, 3);
            tokenId = tokenId << 8;
            tokenId = tokenId | (parentId & 0xFF);
        }
        _mint(to, tokenId);
        emit Infect(from, to, tokenId);
    }
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override {}
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public virtual override {}
    function pseudoRNG(uint modulo, uint nonce) private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, now, totalSupply(), nonce))) % modulo;
    }
}
