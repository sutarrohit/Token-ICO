// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {

    uint256 constant initialSupply = 10000000000000000000000000; 
    uint constant private maxSupply = 5000000000000000000000000;

    constructor(string memory name, string memory symbol) ERC20(name, symbol){
        _mint(msg.sender, initialSupply);  
    }

    function mintToken(uint _amount) external onlyOwner{
        require(totalSupply() < maxSupply, "Already Minted MAX Supply");
        _mint(owner(), _amount);
    }

    function burnToken(uint _amount) external {
        _burn(msg.sender, _amount);
    }

     function getMaxSupply() public pure returns(uint256){
        return maxSupply;
    }

}

// Contract =  0xb89a66ea43df876e0Dbf316310e7709a2754354F
// Owner = 0x88a17004a4d99b7095c2c059b3c24ab1b6f49349