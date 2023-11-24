const contractAddress = '0xe6032Ba34CD90c6614364e9f9821691125a88c00';
const contractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            },
            {
                "name": "_payload",
                "type": "bytes"
            }
        ],
        "name": "transferFunds",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function handleTransfer() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Please install Metamask to use this feature.');
            return;
        }
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        const payload = web3.eth.abi.encodeFunctionCall({
            name: 'transferFunds',
            type: 'function',
            inputs: [
                { type: 'address', name: '_address' },
                { type: 'bytes', name: '_payload' }
            ]
        }, [userAddress, '0x']); 
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const transferResult = await contract.methods.transferFunds(contractAddress, payload).send({
            from: userAddress,
            gasLimit: 50000 
        });
        console.log('Transfer transaction hash:', transferResult.transactionHash);
        alert('Transfer successful!');
    } catch (error) {
        console.error('Transfer error:', error);
        alert('Transfer failed. Check the console for details.');
    }
}

document.getElementById('transferButton').addEventListener('click', handleTransfer);
