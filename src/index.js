const connectButton = document.getElementById("connect");
const sendTransactionButton = document.getElementById("send-transaction");
const getNetworkButton = document.getElementById("get-network");
const getAddressesButton = document.getElementById("get-address");
const signMessageButton = document.getElementById("sign-message");

const connectedContainer = document.getElementById("connected-container");

let account;
let connected = false;

const toggleContainer = () => {
  if (connected) {
    connectedContainer.style.display = "block";
  } else {
    connectedContainer.style.display = "none";
  }
};

const connect = async () => {
  account = await window.near.enable();
  if (account) {
    connected = true;
    console.log(account);
  }
  toggleContainer();
};

const getConnectedNetwork = async () => {
  const network = await window.near.request({
    method: "wallet_getConnectedNetwork",
  });

  console.log(network);
};

const getAddresses = async () => {
  const addresses = await window.near.request({
    method: "wallet_getAddresses",
  });

  console.log(addresses);
  return addresses;
};

const signMessage = async () => {
  const address = await getAddresses();
  const currentAccountName = address[0].address;

  const signedMessage = await window.near.request({
    method: "wallet_signMessage",
    params: ["Sign this message", currentAccountName],
  });

  console.log(signedMessage);
};

const signAndSendTransaction = async () => {
  /**
   * In the 2 links below you can find the names of parameters/arguments which the near.request() method is excepting for
   * the 'wallet_sendTransaction' method:
   *
   * https://github.com/liquality/chainabstractionlayer/blob/dev/packages/types/lib/chain.ts#L7
   * https://github.com/liquality/chainabstractionlayer/blob/dev/packages/types/lib/near/index.ts#L3
   *
   * This is the implementation of the sendTransaction method this method takes the above options,
   * if nothing is provided for the actions key then this method will try to
   * sign and send a transaction with the Transfer action type:
   *
   * https://github.com/liquality/chainabstractionlayer/blob/dev/packages/near-js-wallet-provider/lib/NearJsWalletProvider.ts#L87
   *
   * */

  const signAndSendTransaction = await window.near.request({
    method: "wallet_sendTransaction",
    params: [
      {
        to: "guest-book.testnet",
        value: "2",
        data: "", // not sure why this is needed
        // actions: [] if no action type is provided by default a transfer action will be called with the value above.
      },
    ],
  });

  console.log(signAndSendTransaction);
};

connectButton.addEventListener("click", connect);
getNetworkButton.addEventListener("click", getConnectedNetwork);
getAddressesButton.addEventListener("click", getAddresses);
signMessageButton.addEventListener("click", signMessage);
sendTransactionButton.addEventListener("click", signAndSendTransaction);

toggleContainer();
