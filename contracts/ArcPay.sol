// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArcPay {
    // Event emitted when a query is paid for
    event QueryPaid(address indexed user, uint256 amount, uint256 timestamp);

    // The contract owner
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // Function to receive native payment (on Arc, USDC is the gas token)
    function payForQuery() public payable {
        require(msg.value > 0, "Payment must be greater than 0");
        emit QueryPaid(msg.sender, msg.value, block.timestamp);
    }

    // Function allowing the owner to withdraw the collected payments
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner).transfer(balance);
    }
}
