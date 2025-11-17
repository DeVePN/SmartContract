import { toNano, Address } from '@ton/core';
import { SessionManager } from '../build/SessionManager/SessionManager_SessionManager';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();

    console.log('=== SessionManager Deployment ===\n');

    // Get NodeRegistry address from user
    const nodeRegistryAddressStr = await ui.input('Enter NodeRegistry contract address: ');
    const nodeRegistryAddress = Address.parse(nodeRegistryAddressStr.trim());

    // Get backend public key from user
    const backendPubKeyStr = await ui.input('Enter backend public key (as hex string or decimal): ');
    let backendPubKey: bigint;

    try {
        // Try parsing as hex first
        if (backendPubKeyStr.startsWith('0x')) {
            backendPubKey = BigInt(backendPubKeyStr);
        } else {
            // Parse as decimal
            backendPubKey = BigInt(backendPubKeyStr);
        }
    } catch (e) {
        console.error('Invalid public key format');
        return;
    }

    console.log('\nDeploying SessionManager with:');
    console.log('- NodeRegistry:', nodeRegistryAddress.toString());
    console.log('- Backend PubKey:', backendPubKey.toString());

    const sessionManager = provider.open(
        await SessionManager.fromInit(nodeRegistryAddress, backendPubKey)
    );

    await sessionManager.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sessionManager.address);

    console.log('\n=== Deployment Successful ===');
    console.log('SessionManager deployed at:', sessionManager.address);
    console.log('Total sessions:', await sessionManager.getGetTotalSessions());
    console.log('Stored backend pubkey:', await sessionManager.getGetBackendPubKey());

    console.log('\n=== IMPORTANT ===');
    console.log('Save these addresses in your backend .env:');
    console.log('NODE_REGISTRY_ADDRESS=' + nodeRegistryAddress.toString());
    console.log('SESSION_MANAGER_ADDRESS=' + sessionManager.address.toString());
}
