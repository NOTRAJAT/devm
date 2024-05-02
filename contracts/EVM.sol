// SPDX-License-Identifier: MIT     
pragma solidity ^0.8.0;
contract VotingBlock {


address Admin;
address Voter_Address;
address Machine_Number;


mapping (string => uint256)  VoterCount;
mapping (address => bool) Vote_Machine_Reg;
mapping (address=>bool)  Voter_Map_list;

string [] public Party_Name = ["First","Second"];



address[] Voter_list = 
[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
0x356a192B7913b04c54574D18C28d46e6395428Ab,
0xDA4B9237bacCCdf19C0760CAb7aEC4a8359010b0,
0xDA4B9237bAcccDF19C0760CaB7AeC4a8059010B0


];

address [] Machine_Address_list = [
    0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
    0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,
    0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,
    0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,
    0xdeE827fA9445CFc741F111971A6a8f2f1A8107CF

];

constructor(){
    Admin = msg.sender;
    for(uint i =0;i< Party_Name.length;i++){
        VoterCount[Party_Name[i]]=0;
    }

    for(uint i =0 ; i<Voter_list.length;i++){
        Voter_Map_list[Voter_list[i]]=true;
    }



    for(uint i =0 ; i<Machine_Address_list.length;i++){
         Vote_Machine_Reg[Machine_Address_list[i]]=true;
    }




}

modifier Voter_Eligiblity(address _voter_address) {
  require(Voter_Map_list[_voter_address],"Invalid address");
  _;
  }

modifier Machine_Address_Eligiblity() {
  require(Vote_Machine_Reg[msg.sender],"Access Denied to EMAC");
  _;
  }

  modifier  iSAdmin(){
      require(Admin==msg.sender,"Access Denied to For Admin privilege");
  _;
  }


function Vote_init(address  _voter_Address, string memory PartyName) public Voter_Eligiblity(_voter_Address) Machine_Address_Eligiblity {
    Machine_Number = msg.sender;
    Voter_Address = _voter_Address;

    // require( VoterCount[PartyName]++,"Error");
    VoterCount[PartyName]++;
    Voter_Map_list[_voter_Address]= false;
    // Vote_Machine_Reg[Voter_Address]=Machine_Number;

}

function count() public view returns (uint256[] memory){
    uint256[] memory _COUNT = new uint256[](Party_Name.length);
    for(uint i=0 ;i<Party_Name.length;i++ ){
        _COUNT[i] = VoterCount[Party_Name[i]];
    }
    return _COUNT;
}

function Add_Voter_address (address Voter_address) public iSAdmin {
    Voter_Map_list[Voter_address]=true;
}





}

