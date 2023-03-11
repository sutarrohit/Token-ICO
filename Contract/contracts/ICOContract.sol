//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract ICOContract{

IERC20 tokenContract;

event Investment(address indexed investor, uint256 amount, uint256 tokenBought);

// address of the ICO token holder
address ICOTokenHolder;

// admin of the ICO contract 
address administrator;

// set token price (0.00001 ether = 10000000000000 wei) 1 token = 0.016USD.
uint public tokenPrice = 10000000000000;

// Tokens sold throughout ICO
uint public tokenSold;

// 1 Million token target
uint public icoTarget = 1000000000000000000000000;

// received fund from ICO
uint public receivedFund;

// max and min amount of token investor can buy.
uint maxInvestment  = 100000000000000000000000; //100000 token  
uint minInvestment = 1000000000000; // 1 token 

enum Status {active, inactive, stopped, completed}
Status icoStatus;

uint256 public icoStartTime = block.timestamp;
uint256 public icoEndTime = block.timestamp + 7 days;


modifier onlyOnwer(){
    require(msg.sender == administrator,"Not Administrator");
    _;
}

constructor(address _tokenContract, address _ICOTokenHolder){
    administrator = msg.sender;
    tokenContract = IERC20(_tokenContract);
    ICOTokenHolder = _ICOTokenHolder;
}

// Stop ICO function
function setStopStatus() external onlyOnwer{
    icoStatus = Status.stopped;
}

// Active ICO function
function setActiveStatus() external onlyOnwer{
    icoStatus = Status.active;
}

// Distribute ICO tokens
function distributeToken() payable public returns(bool){
    require(getIcoStatus() == Status.active,"ICO is not active");
    require(msg.sender == tx.origin, "Contract can't participate in ICO");
    require(icoTarget > tokenSold, "Investment not accepted, ICO Target achieved");
    require(msg.value > minInvestment &&  msg.value < maxInvestment,"Send correct ETH" );

    uint256 tokens = ((msg.value / tokenPrice) * 10**18); // amount tokens investor receives.
    tokenSold += tokens; 

    // add received to fund
    receivedFund += msg.value;
    
    // Transfer token from ICO token holder account to investor; 
    bool success = tokenContract.transferFrom(ICOTokenHolder, msg.sender, tokens);
    require(success,"Token transfer failed");

    emit Investment(msg.sender, msg.value,tokens);

    return true;
}

// administrator withdraw ETH after ICO
function withdrawETH() external onlyOnwer {
    (bool success,) = administrator.call{value:receivedFund}(""); 
    require(success,"Transfer failed");
}

// get current ICO status
function getIcoStatus() public view returns(Status){
 if(icoStatus == Status.stopped){
        return Status.stopped;
    }
    else if(block.timestamp >= icoStartTime && block.timestamp <= icoEndTime){
        return Status.active;
    }
     else if(block.timestamp <= icoStartTime){
        return Status.inactive;
    }
    else{
        return Status.completed;
    }
}
}

// 0x9e612bF8A0C563588628571442263a89F39d73ad