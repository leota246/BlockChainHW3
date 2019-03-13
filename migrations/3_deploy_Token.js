const ExampleToken = artifacts.require("./ExampleToken.sol");
const ExampleTokenCrowdsale = artifacts.require("./ExampleTokenCrowdsale.sol");

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
  const _name = "CSC4980 Token";
  const _symbol = "GSU";
  const _decimals = 18;

  // await deployer.deploy(ExampleToken, _name, _symbol, _decimals);
  // const deployedToken = await ExampleToken.deployed();

  ExampleToken.deployed(_name, _symbol, _decimals).then((t) => {token = t;});

  const latestTime = (new Date).getTime();

  const _rate           = ether(500);
  const _wallet         = accounts[0]; // TODO: Replace me
  const _token          = ExampleToken.address;
  const _cap            = ether(200);


  // await deployer.deploy(
  //   ExampleTokenCrowdsale,
  //   _rate,
  //   _wallet,
  //   _token,
  //   _cap
  // );

  ExampleTokenCrowdsale.deployed(
    _rate, 
    _wallet, 
    _token, 
    _cap).then((t) => {sale = t;});
  
  //console.log("Token leftv >>>>>>>"+_wallet.toNumber());
  ExampleTokenCrowdsale.buyTokens(web3.eth.accounts[1], {value : new web3.BigNumber(web3.toWei(1, 'ether')) , from : web3.eth.accounts[1]});
  //console.log("Token leftv >>>>>>>"+ExampleTokenCrowdsale.token);
  return true;
};
