import { toNano, Address } from '@ton/core';
import { NodeRegistry } from '../build/NodeRegistry/NodeRegistry_NodeRegistry';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
      const sessionManagerAddr = Address.parse('EQDu3ep204NLbW9CFAAcpj5qiRGPCj2R5vxzID4LSeSL_Ae0');
      const nodeRegistry = provider.open(await NodeRegistry.fromInit(sessionManagerAddr));
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

    console.log('NodeRegistry deployed at:', nodeRegistry.address);
    console.log('Total nodes:', await nodeRegistry.getGetTotalNodes());

    // Save address for SessionManager deployment
    console.log('\n=== IMPORTANT ===');
    console.log('Save this address for SessionManager deployment:');
    console.log(nodeRegistry.address.toString());
}
