import { toNano, Address } from '@ton/core';
import { SessionManager } from '../build/SessionManager/SessionManager_SessionManager';
import { NodeRegistry } from '../build/NodeRegistry/NodeRegistry_NodeRegistry';
import { SimpleCounter } from '../build/SimpleCounter/SimpleCounter_SimpleCounter';
import { NetworkProvider } from '@ton/blueprint';
import * as fs from 'fs';
import * as path from 'path';

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();

    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║       DeVPN Smart Contracts - Deploy All Suite        ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    // Get backend public key from user (required for SessionManager)
    console.log('📝 Configuration Input Required:\n');
    const backendPubKeyStr = await ui.input('Enter backend public key (hex with 0x prefix or decimal): ');
    let backendPubKey: bigint;

    try {
        if (backendPubKeyStr.startsWith('0x')) {
            backendPubKey = BigInt(backendPubKeyStr);
        } else {
            backendPubKey = BigInt(backendPubKeyStr);
        }
        console.log('✓ Backend public key:', backendPubKey.toString(), '\n');
    } catch (e) {
        console.error('❌ Invalid public key format');
        return;
    }

    // Ask if user wants to deploy SimpleCounter (demo contract)
    const deploySimpleCounter = await ui.choose(
        'Deploy SimpleCounter demo contract?',
        ['Yes', 'No'],
        (c) => c
    );

    console.log('\n' + '═'.repeat(56));
    console.log('Starting deployment sequence...');
    console.log('═'.repeat(56) + '\n');

    const deployedContracts: {
        sessionManager?: string;
        nodeRegistry?: string;
        simpleCounter?: string;
    } = {};

    // ============================================================
    // STEP 1: Deploy SessionManager
    // ============================================================
    console.log('📦 [1/3] Deploying SessionManager...\n');

    // Use a placeholder zero address for NodeRegistry initially
    // This resolves the circular dependency issue
    const placeholderNodeRegistryAddress = Address.parse('EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c');

    console.log('ℹ️  Using placeholder NodeRegistry address (will be updated)');
    console.log('   Placeholder:', placeholderNodeRegistryAddress.toString());

    const sessionManager = provider.open(
        await SessionManager.fromInit(placeholderNodeRegistryAddress, backendPubKey)
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
    deployedContracts.sessionManager = sessionManager.address.toString();

    console.log('✅ SessionManager deployed!');
    console.log('   Address:', sessionManager.address.toString());
    console.log('   Total sessions:', await sessionManager.getGetTotalSessions());
    console.log('   Backend pubkey:', await sessionManager.getGetBackendPubKey());
    console.log('');

    // ============================================================
    // STEP 2: Deploy NodeRegistry
    // ============================================================
    console.log('📦 [2/3] Deploying NodeRegistry...\n');

    console.log('ℹ️  Using SessionManager address:', sessionManager.address.toString());

    const nodeRegistry = provider.open(
        await NodeRegistry.fromInit(sessionManager.address)
    );

    await nodeRegistry.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(nodeRegistry.address);
    deployedContracts.nodeRegistry = nodeRegistry.address.toString();

    console.log('✅ NodeRegistry deployed!');
    console.log('   Address:', nodeRegistry.address.toString());
    console.log('   Total nodes:', await nodeRegistry.getGetTotalNodes());
    console.log('');

    // ============================================================
    // STEP 3: Deploy SimpleCounter (Optional)
    // ============================================================
    if (deploySimpleCounter === 'Yes') {
        console.log('📦 [3/3] Deploying SimpleCounter...\n');

        const simpleCounter = provider.open(await SimpleCounter.fromInit(1n, 0n));

        await simpleCounter.send(
            provider.sender(),
            {
                value: toNano('0.05'),
            },
            null
        );

        await provider.waitForDeploy(simpleCounter.address);
        deployedContracts.simpleCounter = simpleCounter.address.toString();

        console.log('✅ SimpleCounter deployed!');
        console.log('   Address:', simpleCounter.address.toString());
        console.log('   Counter value:', await simpleCounter.getCounter());
        console.log('');
    } else {
        console.log('⏭️  [3/3] Skipping SimpleCounter deployment\n');
    }

    // ============================================================
    // Summary & Export
    // ============================================================
    console.log('\n' + '═'.repeat(56));
    console.log('🎉 Deployment Complete!');
    console.log('═'.repeat(56) + '\n');

    console.log('📋 Deployed Contract Addresses:\n');
    console.log('SessionManager:');
    console.log('  ' + deployedContracts.sessionManager);
    console.log('');
    console.log('NodeRegistry:');
    console.log('  ' + deployedContracts.nodeRegistry);
    if (deployedContracts.simpleCounter) {
        console.log('');
        console.log('SimpleCounter:');
        console.log('  ' + deployedContracts.simpleCounter);
    }

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'deployed-contracts.json');
    const deploymentData = {
        network: provider.network(),
        timestamp: new Date().toISOString(),
        contracts: deployedContracts,
        backendPubKey: backendPubKey.toString(),
    };

    fs.writeFileSync(outputPath, JSON.stringify(deploymentData, null, 2));
    console.log('\n💾 Addresses saved to: deployed-contracts.json');

    // Environment variables format
    console.log('\n' + '═'.repeat(56));
    console.log('📄 Backend .env Format:');
    console.log('═'.repeat(56));
    console.log('');
    console.log('SESSION_MANAGER_ADDRESS=' + deployedContracts.sessionManager);
    console.log('NODE_REGISTRY_ADDRESS=' + deployedContracts.nodeRegistry);
    console.log('TON_NETWORK=' + provider.network());
    console.log('');

    console.log('═'.repeat(56));
    console.log('📄 Frontend .env Format:');
    console.log('═'.repeat(56));
    console.log('');
    console.log('NEXT_PUBLIC_SESSION_MANAGER_CONTRACT=' + deployedContracts.sessionManager);
    console.log('NEXT_PUBLIC_NODE_REGISTRY_CONTRACT=' + deployedContracts.nodeRegistry);
    console.log('NEXT_PUBLIC_TON_NETWORK=' + provider.network());
    console.log('');

    // Warning about circular dependency
    console.log('\n' + '═'.repeat(56));
    console.log('⚠️  IMPORTANT NOTE - Circular Dependency Workaround');
    console.log('═'.repeat(56));
    console.log('');
    console.log('SessionManager was deployed with a placeholder NodeRegistry address.');
    console.log('The actual NodeRegistry address is:', deployedContracts.nodeRegistry);
    console.log('');
    console.log('If SessionManager needs to interact with NodeRegistry, you may need to:');
    console.log('1. Add an admin function to update the NodeRegistry address, OR');
    console.log('2. Redeploy SessionManager with the correct NodeRegistry address');
    console.log('');
    console.log('For this hackathon demo, the current setup should work for basic testing.');
    console.log('');

    console.log('═'.repeat(56));
    console.log('✨ All contracts deployed successfully!');
    console.log('═'.repeat(56) + '\n');
}
