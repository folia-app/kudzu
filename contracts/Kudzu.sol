pragma solidity ^0.6.8;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Metadata.sol";

/**
 * The FoliaVirus contract does this and that and doesn't stop.
 */

contract Kudzu is ERC1155, Ownable {
    Metadata public metadata;

    uint256 public createPrice = 1 ether; // TIA ~$8
    uint256 public buyPrice = 0.5 ether; // TIA ~$4
    uint256 public invitePrice = 0.25 ether; // TIA ~$2
    uint256 public acceptPrice = 0.25 ether; // TIA ~$2
    uint256 public attackPrice = 0.5 ether; // TIA ~$4

    uint256 public endDate = 1735689600; // Wed Jan 01 2025 00:00:00 GMT+0000
    uint256 public percentOfCreate = 500; // 500 / 1000 = 50%
    uint256 public percentOfBuy = 500; // 500 / 1000 = 50%
    uint256 public percentOfInvite = 500; // 500 / 1000 = 50%
    uint256 public percentOfAccept = 500; // 500 / 1000 = 50%
    uint256 public percentOfAttack = 500; // 500 / 1000 = 50%
    uint256 public constant DENOMINATOR = 1000;

    uint256 public paidOut;
    address public recipient;

    event Invite(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        uint256 familyCount
    );

    event EthMoved(
        address indexed to,
        bool indexed success,
        bytes returnData,
        uint256 amount
    );

    struct Infector {
        address family;
        uint256 count;
        uint256 paidOut;
    }

    mapping(address => Infector) public family;
    mapping(address => Infector) public individual;

    Infector public topFamily;

    constructor(Metadata _metadata) public {
        metadata = _metadata;
        recipient = msg.sender;
    }

    function mintPatientZero() public payable {
        require(block.timestamp < endDate, "SALE ENDED");
        require(msg.value == price, "INSUFFICIENT FUNDS");
        uint256 tokenId = totalSupply() + 1;
        tokenId = tokenId << 8;
        tokenId = tokenId | pseudoRNG(32, 1);

        tokenId = tokenId << 8;
        tokenId = tokenId | pseudoRNG(32, 2);
        _mint(msg.sender, tokenId);
        (uint256 id, uint256 eyes, uint256 mouth) = getPiecesOfTokenID(tokenId);
        emit Invite(
            address(0),
            msg.sender,
            tokenId,
            id,
            eyes,
            mouth,
            msg.sender,
            1
        );
        family[msg.sender] = Infector(msg.sender, 1, 0);
        if (topFamily.family == address(0)) {
            topFamily = Infector(msg.sender, 1, 0);
        }
        uint256 payoutToRecipient = (msg.value * percentOfSales) / DENOMINATOR;
        (bool success, bytes memory data) = recipient.call{
            value: payoutToRecipient
        }("");
        emit EthMoved(recipient, success, data, payoutToRecipient);
        require(success, "TRANSFER FAILED");
    }

    function getPiecesOfTokenID(
        uint256 tokenId
    ) public pure returns (uint256 id, uint256 eyes, uint256 mouth) {
        return (tokenId >> 16, ((tokenId >> 8) & 0xFF), tokenId & 0xFF);
    }

    function updateRecipient(address _recipient) public onlyOwner {
        recipient = _recipient;
    }

    function updateMetadata(Metadata _metadata) public onlyOwner {
        metadata = _metadata;
    }

    function updatePrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function updatePercentOfSales(uint256 _percentOfSales) public onlyOwner {
        require(_percentOfSales <= DENOMINATOR, "INVALID PERCENTAGE");
        percentOfSales = _percentOfSales;
    }

    function payout() public {
        require(block.timestamp > endDate, "INFECTION NOT ENDED");
        require(
            individual[msg.sender].family == topFamily.family,
            "NOT PART OF WINNING FAMILY"
        );
        require(individual[msg.sender].paidOut == 0, "ALREADY PAID OUT");
        uint256 balance = address(this).balance;

        uint256 originalAmount = balance + paidOut;
        uint256 familyTotal = topFamily.count;
        uint256 individualTotal = individual[topFamily.family].count;
        uint256 individualCut = (individualTotal * DENOMINATOR) / familyTotal;
        uint256 currentPayout = (originalAmount * individualCut) / DENOMINATOR;
        if (currentPayout > balance) {
            currentPayout = balance; // TODO: check if this is possible
        }
        individual[msg.sender].paidOut = currentPayout;
        topFamily.paidOut += currentPayout;
        paidOut += currentPayout;
        (bool success, bytes memory data) = payable(msg.sender).call{
            value: currentPayout
        }("");
        emit EthMoved(msg.sender, success, data, currentPayout);
        require(success, "TRANSFER FAILED");
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("THERE IS NO ANTIDOTE");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        transferFrom(from, to, tokenId);
    }

    function infect(
        address from,
        address to,
        uint256 tokenId
    ) public payable virtual {
        require(msg.value == infectPrice, "INSUFFICIENT FUNDS");
        require(msg.sender == from, "NOT AUTHORIZED");
        require(balanceOf(from) == 1, "NOT YET INFECTED");
        require(balanceOf(to) == 0, "ALREADY INFECTED"); // TODO: decide if this is necessary
        require(payable(to).balance > 0, "EMPTY WALLET");
        require(block.timestamp < endDate, "INFECTION ENDED");
        uint256 parentId = tokenId;
        tokenId = totalSupply() + 1; // TODO: change to 1155
        tokenId = tokenId << 8;
        if (pseudoRNG(2, 1) == 0) {
            //inherit eyes
            tokenId = tokenId | ((parentId >> 8) & 0xFF);
            tokenId = tokenId << 8;
            tokenId = tokenId | pseudoRNG(32, 2);
        } else {
            //inherit mouth
            tokenId = tokenId | pseudoRNG(32, 3);
            tokenId = tokenId << 8;
            tokenId = tokenId | (parentId & 0xFF);
        }
        (uint256 id, uint256 eyes, uint256 mouth) = getPiecesOfTokenID(
            parentId
        );
        _mint(from, tokenId);
        _transfer(from, to, tokenId);

        Infector storage fromIndividual = individual[from];
        Infector storage fromFamily = family[fromIndividual.family];
        individual[to] = Infector(fromFamily.family, 1, 0);
        fromFamily.count++;
        fromIndividual.count++;

        if (fromFamily.count > topFamily.count) {
            topFamily = fromFamily;
        }
        emit Invite(
            from,
            to,
            tokenId,
            id,
            eyes,
            mouth,
            fromFamily.family,
            fromFamily.count
        );
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        return metadata.tokenURI(tokenId);
    }

    function pseudoRNG(uint modulo, uint nonce) private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        now,
                        totalSupply(),
                        nonce
                    )
                )
            ) % modulo;
    }

    /// @dev if mint fails to send eth to splitter, admin can recover
    // This should not be necessary but Berlin hardfork broke split before so this
    // is extra precaution.
    function recoverLockedETH(address payable _to) public onlyOwner {
        uint256 amount = address(this).balance;
        (bool sent, bytes memory data) = _to.call{value: amount}("");
        emit EthMoved(_to, sent, data, amount);
    }
}
