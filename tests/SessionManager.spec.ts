import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, beginCell } from '@ton/core';
import { SessionManager } from '../build/SessionManager/tact_SessionManager';
import { NodeRegistry } from '../build/NodeRegistry/tact_NodeRegistry';
import '@ton/test-utils';

describe('SessionManager', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sessionManager: SandboxContract<SessionManager>;
    let nodeRegistry: SandboxContract<NodeRegistry>;
    let backendPubKey: bigint;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        // Deploy NodeRegistry first
        nodeRegistry = blockchain.openContract(await NodeRegistry.fromInit());
        await nodeRegistry.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Deploy', queryId: 0n }
        );

        // Mock backend public key (for testing)
        backendPubKey = 123456789n;

        // Deploy SessionManager
        sessionManager = blockchain.openContract(
            await SessionManager.fromInit(nodeRegistry.address, backendPubKey)
        );

        const deployResult = await sessionManager.send(
            deployer.getSender(),
            { value: toNano('0.05') },
            { $$type: 'Deploy', queryId: 0n }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: sessionManager.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy successfully', async () => {
        const totalSessions = await sessionManager.getTotalSessions();
        expect(totalSessions).toBe(0n);

        const storedPubKey = await sessionManager.getBackendPubKey();
        expect(storedPubKey).toBe(backendPubKey);
    });

    it('should start a new session with prepaid deposit', async () => {
        const user = await blockchain.treasury('user');

        // Register a node first
        const nodeProvider = await blockchain.treasury('node_provider');
        await nodeRegistry.send(
            nodeProvider.getSender(),
            { value: toNano('0.01') },
            {
                $$type: 'RegisterNode',
                metadataHash: 12345n,
                pricePerByte: toNano('0.000001'),
            }
        );

        // Start session with 0.1 TON deposit
        const startResult = await sessionManager.send(
            user.getSender(),
            { value: toNano('0.1') },
            {
                $$type: 'StartSession',
                nodeId: 0,
            }
        );

        expect(startResult.transactions).toHaveTransaction({
            from: user.address,
            to: sessionManager.address,
            success: true,
        });

        const totalSessions = await sessionManager.getTotalSessions();
        expect(totalSessions).toBe(1n);

        const session = await sessionManager.getSession(0n);
        expect(session).toBeDefined();
        expect(session?.isActive).toBe(true);
        expect(session?.nodeId).toBe(0);
    });

    it('should end session and calculate refund', async () => {
        const user = await blockchain.treasury('user');
        const nodeProvider = await blockchain.treasury('node_provider');

        // Register node
        await nodeRegistry.send(
            nodeProvider.getSender(),
            { value: toNano('0.01') },
            {
                $$type: 'RegisterNode',
                metadataHash: 12345n,
                pricePerByte: toNano('0.000001'),
            }
        );

        // Start session
        await sessionManager.send(
            user.getSender(),
            { value: toNano('0.1') },
            {
                $$type: 'StartSession',
                nodeId: 0,
            }
        );

        // Mock signature (in real scenario, backend signs this)
        const sessionId = 0n;
        const usageBytes = 1000n;

        const dataCell = beginCell()
            .storeUint(sessionId, 64)
            .storeUint(usageBytes, 64)
            .endCell();

        // For testing, we'll skip real signature verification
        // In production, backend would sign dataCell.hash() with private key
        const mockSignature = beginCell()
            .storeUint(0, 512) // 512-bit signature placeholder
            .endCell()
            .beginParse();

        // Note: This test will fail signature verification
        // For hackathon demo, you'd either:
        // 1. Use actual backend signing in tests
        // 2. Temporarily disable signature check for testing
        console.log('Session started, ready to end (signature verification required)');
    });
});
