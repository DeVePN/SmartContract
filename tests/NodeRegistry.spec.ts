import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { NodeRegistry } from '../build/NodeRegistry/NodeRegistry_NodeRegistry';
import '@ton/test-utils';

describe('NodeRegistry', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nodeRegistry: SandboxContract<NodeRegistry>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        nodeRegistry = blockchain.openContract(await NodeRegistry.fromInit());

        const deployResult = await nodeRegistry.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nodeRegistry.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy successfully', async () => {
        const totalNodes = await nodeRegistry.getTotalNodes();
        expect(totalNodes).toBe(0n);
    });

    it('should register a new node', async () => {
        const nodeProvider = await blockchain.treasury('node_provider');

        const registerResult = await nodeRegistry.send(
            nodeProvider.getSender(),
            {
                value: toNano('0.01'),
            },
            {
                $$type: 'RegisterNode',
                metadataHash: 12345n,
                pricePerByte: toNano('0.000001'),
            }
        );

        expect(registerResult.transactions).toHaveTransaction({
            from: nodeProvider.address,
            to: nodeRegistry.address,
            success: true,
        });

        const totalNodes = await nodeRegistry.getTotalNodes();
        expect(totalNodes).toBe(1n);

        const node = await nodeRegistry.getNode(0n);
        expect(node).toBeDefined();
        expect(node?.metadataHash).toBe(12345n);
        expect(node?.isActive).toBe(true);
    });

    it('should allow node owner to withdraw earnings', async () => {
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

        // Simulate earnings (from SessionManager)
        const sessionManager = await blockchain.treasury('session_manager');
        await nodeRegistry.send(
            sessionManager.getSender(),
            { value: toNano('0.01') },
            {
                $$type: 'AddEarnings',
                nodeId: 0,
                amount: toNano('1'),
            }
        );

        // Withdraw earnings
        const withdrawResult = await nodeRegistry.send(
            nodeProvider.getSender(),
            { value: toNano('0.01') },
            {
                $$type: 'WithdrawEarnings',
                nodeId: 0,
            }
        );

        expect(withdrawResult.transactions).toHaveTransaction({
            from: nodeRegistry.address,
            to: nodeProvider.address,
            success: true,
        });
    });
});
