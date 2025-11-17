import "@stdlib/deploy";

// Node information structure
struct NodeInfo {
    owner: Address;
    metadataHash: Int as uint256;
    pricePerByte: Int as coins;
    totalEarnings: Int as coins;
    isActive: Bool;
}

// Message types
message RegisterNode {
    metadataHash: Int as uint256;
    pricePerByte: Int as coins;
}

message UnregisterNode {
    nodeId: Int as uint32;
}

message UpdateMetadata {
    nodeId: Int as uint32;
    metadataHash: Int as uint256;
    pricePerByte: Int as coins;
}

message WithdrawEarnings {
    nodeId: Int as uint32;
}

message AddEarnings {
    nodeId: Int as uint32;
    amount: Int as coins;
}

contract NodeRegistry with Deployable {
    nextNodeId: Int as uint32 = 0;
    nodes: map<Int as uint32, NodeInfo>;
    sessionManagerAddress: Address;

    init(sessionManagerAddress: Address) {
        self.sessionManagerAddress = sessionManagerAddress;
    }

    // Register a new VPN node
    receive(msg: RegisterNode) {
        let nodeId: Int = self.nextNodeId;

        let nodeInfo: NodeInfo = NodeInfo{
            owner: sender(),
            metadataHash: msg.metadataHash,
            pricePerByte: msg.pricePerByte,
            totalEarnings: 0,
            isActive: true
        };

        self.nodes.set(nodeId, nodeInfo);
        self.nextNodeId = self.nextNodeId + 1;
    }

    // Unregister node and withdraw earnings
    receive(msg: UnregisterNode) {
        let node: NodeInfo = self.nodes.get(msg.nodeId)!!;
        require(node.owner == sender(), "Not node owner");

        // Mark as inactive
        node.isActive = false;
        self.nodes.set(msg.nodeId, node);

        // Send all earnings to owner
        if (node.totalEarnings > 0) {
            send(SendParameters{
                to: node.owner,
                value: node.totalEarnings,
                mode: SendIgnoreErrors,
                body: "Node unregistered".asComment()
            });
        }
    }

    // Update node metadata and price
    receive(msg: UpdateMetadata) {
        let node: NodeInfo = self.nodes.get(msg.nodeId)!!;
        require(node.owner == sender(), "Not node owner");

        node.metadataHash = msg.metadataHash;
        node.pricePerByte = msg.pricePerByte;
        self.nodes.set(msg.nodeId, node);
    }

    // Add earnings to a node (called by SessionManager only)
    receive(msg: AddEarnings) {
        require(sender() == self.sessionManagerAddress, "Only SessionManager");
        let node: NodeInfo = self.nodes.get(msg.nodeId)!!;
        node.totalEarnings = node.totalEarnings + msg.amount;
        self.nodes.set(msg.nodeId, node);
    }

    // Withdraw earnings without unregistering
    receive(msg: WithdrawEarnings) {
        let node: NodeInfo = self.nodes.get(msg.nodeId)!!;
        require(node.owner == sender(), "Not node owner");
        require(node.totalEarnings > 0, "No earnings");

        let amount: Int = node.totalEarnings;
        node.totalEarnings = 0;
        self.nodes.set(msg.nodeId, node);

        send(SendParameters{
            to: node.owner,
            value: amount,
            mode: SendIgnoreErrors,
            body: "Earnings withdrawn".asComment()
        });
    }

    // Get node information by ID
    get fun getNode(nodeId: Int): NodeInfo? {
        return self.nodes.get(nodeId);
    }

    // Get total number of nodes
    get fun getTotalNodes(): Int {
        return self.nextNodeId;
    }
}
