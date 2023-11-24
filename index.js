
if (typeof window.ethereum === 'undefined') {
    alert('Please install Metamask to use this feature.');
} else {
    const web3 = new Web3(window.ethereum);

    const contractAddress = '0xc0B5127FC44E1a7A4069136d24CE64eB2fb2bd77';
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
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[1];
            const payload = web3.eth.abi.encodeFunctionCall({
                name: 'transferFunds',
                type: 'function',
                inputs: [
                    { type: 'address', name: '_address' },
                    { type: 'bytes', name: '_payload' }
                ]
            }, [userAddress, '0x']);
            const contract = new web3.eth.Contract(contractAbi, contractAddress);

            // Use gas price estimation here or set gas manually
            const gasPrice = await web3.eth.getGasPrice(121);

            const transferResult = await contract.methods.transferFunds(contractAddress, payload).send({
                from: userAddress,
                gasLimit: web3.utils.toHex(50000), // Set gas limit accordingly
                gasPrice: web3.utils.toHex(gasPrice)
            });

            console.log('Transfer transaction hash:', transferResult.transactionHash);
            alert('Transfer successful!');
        } catch (error) {
            console.error('Transfer error:', error);
            alert('Transfer failed. Check the console for details.');
        }
    }

    document.getElementById('transferButton').addEventListener('click', handleTransfer);
    
}



