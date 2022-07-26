//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Garrison {
    address payable public garrison;
    uint256 public garrisonBal;

    constructor() payable{
        garrison = payable(msg.sender);
        garrisonBal = msg.value;
    }

    mapping(address => uint256) winBalanceOf;
    Stake[] stakes;
    mapping(address => uint256) win;
    address[] payroll;
    WinnersStruct[] winners;

    modifier mustBeGarrison{
        require(msg.sender == garrison, "Only Garrison can payout");
        _;
    }

    struct Stake {
        address player;
        uint256 amount;
        string category;
        uint256 timestamp;
    }

    struct WinnersStruct {
        address player;
        uint256 amount;
        string category;
        uint256 timestamp;
    }
    
    event StakeEvent(address from, address _player, uint256 _amount, string _category, uint256 timestamp);
    event PayoutEvent(address to, uint256 _amout, uint256 timestamp);

    function makeStake(uint256 _amount, string memory _category) public payable {
        stakes.push(Stake(msg.sender, _amount, _category, block.timestamp));
        garrison.transfer(msg.value);
        emit StakeEvent(garrison, msg.sender,_amount,_category,block.timestamp);
    }

    function setPlayerWin(uint256 _amount, string memory _category) public {
        win[msg.sender] = _amount;
        winBalanceOf[msg.sender] += _amount;
        payroll.push(msg.sender);
        winners.push(WinnersStruct(msg.sender, _amount, _category, block.timestamp));
        
    }

    function payout() public payable mustBeGarrison {
        for(uint i=0; i<payroll.length; i++){
            require(garrisonBal >= win[payroll[i]]);
            garrisonBal -= win[payroll[i]];
            payable (payroll[i]).transfer(win[payroll[i]]);
            winBalanceOf[payroll[i]] -= win[payroll[i]];
            win[payroll[i]] = 0;
            emit PayoutEvent(msg.sender, win[payroll[i]], block.timestamp);
        }
        delete payroll;
    }

    function getWinBalance() public view returns(uint256){
        return winBalanceOf[msg.sender];
    }

    function getAllStakes() public view returns (Stake[] memory){
        return stakes;
    }

    function getAllWinners() public view returns (WinnersStruct[] memory){
        return winners;
    }

    function getPayrollList() public view returns (address[] memory){
        return payroll;
    }
}