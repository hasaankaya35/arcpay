import fs from 'fs';
import path from 'path';
import solc from 'solc';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function main() {
    const pk = process.env.PRIVATE_KEY;
    if (!pk) {
        console.error("❌ HATA: '.env' dosyasında PRIVATE_KEY bulunamadı!");
        console.log("Lütfen ana dizinde bir '.env' dosyası oluşturup içine şunu yazın:");
        console.log("PRIVATE_KEY=senin_metamask_gizli_anahtarın");
        process.exit(1);
    }

    console.log("🛠️ 1. Kontrat derleniyor (Compiling)...");
    const contractPath = path.resolve(__dirname, '../contracts/ArcPay.sol');
    const source = fs.readFileSync(contractPath, 'utf8');

    const input = {
        language: 'Solidity',
        sources: {
            'ArcPay.sol': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    if (output.errors) {
        let hasErrors = false;
        output.errors.forEach(err => {
            console.error(err.formattedMessage);
            if (err.severity === 'error') hasErrors = true;
        });
        if (hasErrors) {
            console.error("❌ Derleme hatası!");
            process.exit(1);
        }
    }

    const contractFile = output.contracts['ArcPay.sol']['ArcPay'];
    const abi = contractFile.abi;
    const bytecode = contractFile.evm.bytecode.object;

    console.log("🌐 2. Arc Testnet'e bağlanılıyor...");
    const provider = new ethers.JsonRpcProvider("https://rpc.testnet.arc.network");
    
    let wallet;
    try {
        if (pk.split(' ').length > 1) {
            // Mnemonic format
            wallet = ethers.Wallet.fromPhrase(pk, provider);
        } else {
            // Hex format private key
            wallet = new ethers.Wallet(pk, provider);
        }
    } catch(err) {
        console.error("❌ HATA: Girdiğiniz Private Key veya Gizli Kelime (Mnemonic) formatı geçersiz!");
        console.error(err.message);
        process.exit(1);
    }
    
    console.log(`Cüzdan adresi: ${wallet.address}`);
    
    const balance = await provider.getBalance(wallet.address);
    console.log(`Bakiye: ${ethers.formatEther(balance)} USDC`);
    
    if (balance === 0n) {
        console.error("❌ HATA: Cüzdanında test USDC bulunmuyor. Lütfen Arc faucet'ten test USDC al.");
        process.exit(1);
    }

    console.log("🚀 3. Kontrat ağa yükleniyor (Deploying)... Lütfen bekleyin.");
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    
    const address = await contract.getAddress();
    console.log(`\n✅ BAŞARILI! Kontrat Arc Network'e yüklendi.`);
    console.log(`📜 Kontrat Adresi: ${address}`);
    
    // Uygulamaya otomatik kaydet
    const envPath = path.resolve(__dirname, '../.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    if (envContent.includes('VITE_CONTRACT_ADDRESS')) {
        envContent = envContent.replace(/VITE_CONTRACT_ADDRESS=.*/, `VITE_CONTRACT_ADDRESS=${address}`);
    } else {
        envContent += `\nVITE_CONTRACT_ADDRESS=${address}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log("📝 VITE_CONTRACT_ADDRESS bilgisi .env dosyasına otomatik yazıldı!");
    console.log("Artık 'npm run dev' yazıp projeyi çalıştırabilirsin!");
}

main().catch(console.error);
