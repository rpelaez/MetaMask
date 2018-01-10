
        window.addEventListener('load', function() {
            // Check if Web3 has been injected by the browser:
            if (typeof web3 !== 'undefined') {
                // You have a web3 browser! Continue below!
                startApp(web3);
            } else {
                // Warn the user that they need to get a web3 browser
                // Or install MetaMask, maybe with a nice graphic.
            }
        });
        const abi = [{
            "constant": false,
            "inputs": [
            ],
            "name": "buy",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": true,
            "type": "function"
        }];
        const contract_address = '0xf035755df96ad968a7ad52c968dbe86d52927f5b';
        const etherValue = web3.toWei(10, 'ether');
        var address = '0x91612055A68aD74A6e756615941Ac59e9220A940';
        var eth = null;
        function startApp(web3) {
            //alert("entro");
            document.getElementById("etherlog").innerHTML = "entro";
            eth = new Eth(web3.currentProvider);
            const token = eth.contract(abi).at(contract_address);
            listenForClicks(token,web3);
            //alert("llego");
            document.getElementById("etherlog").innerHTML = "llego";
        }
        function listenForClicks (miniToken, web3) {
            var button = document.getElementById("etherforart");
            //alert(button);
            web3.eth.getAccounts(function(err, accounts) { console.log(accounts); document.getElementById("etherlog").innerHTML = "Cargando Cuenta "+ accounts; address = accounts.toString(); });
            button.addEventListener('click', function() {
                // 1 Eth = '1000000000000000000'
                miniToken.buy( { from: address, value: '1', data: '0x123' })
                    .then(function (txHash) {
                    console.log('Transaction sent');
                    console.dir(txHash);
                    waitForTxToBeMined(txHash);
                    document.getElementById("etherlog").innerHTML = "txHash:" + txHash;
                })
                    .catch(console.error);
            });
        };
        async function waitForTxToBeMined (txHash) {
            let txReceipt;
            while (!txReceipt) {
                try {
                    txReceipt = await eth.getTransactionReceipt(txHash);
                    //var data = [];
                    //data.append(eth.getTransactionReceipt(txReceipt).data);
                    //console.log(data);
                    document.getElementById("etherlog").innerHTML = "Esperando transacción a ser validada " + txHash;
                } catch (err) {
                    document.getElementById("etherlog").innerHTML = "ERROR:"+err;
                    return indicateFailure(err);
                }
            }
            document.getElementById("etherlog").innerHTML = "Transaccion OK! " + txHash;
            indicateSuccess();
        }
    
