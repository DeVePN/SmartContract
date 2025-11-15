import "@stdlib/deploy";

// Session information structure
struct Session {
    user: Address;
    nodeId: Int as uint32;
    depositAmount: Int as coins;
    usageBytes: Int as uint64;
    isActive: Bool;
}

// Message types
message StartSession {
    nodeId: Int as uint32;
}

message EndSession {
    sessionId: Int as uint64;
    usageBytes: Int as uint64;
    signature: Slice;
}

// Internal message to node registry
message AddEarnings {
    nodeId: Int as uint32;
    amount: Int as coins;
}

contract SessionManager with Deployable {
    sessions: map<Int as uint64, Session>;
    nextSessionId: Int as uint64 = 0;
    nodeRegistryAddress: Address;
    backendPubKey: Int as uint256;

    init(nodeRegistryAddress: Address, backendPubKey: Int) {
        self.nodeRegistryAddress = nodeRegistryAddress;
        self.backendPubKey = backendPubKey;
    }

    // Start a new VPN session with prepaid deposit
    receive(msg: StartSession) {
        let depositAmount: Int = context().value;
        require(depositAmount > 0, "Deposit required");

        let sessionId: Int = self.nextSessionId;

        let session: Session = Session{
            user: sender(),
            nodeId: msg.nodeId,
            depositAmount: depositAmount,
            usageBytes: 0,
            isActive: true
        };

        self.sessions.set(sessionId, session);
        self.nextSessionId = self.nextSessionId + 1;

        // Send confirmation back to user
        self.reply("Session started".asComment());
    }

    // End session with signed usage report from backend
    receive(msg: EndSession) {
        let session: Session = self.sessions.get(msg.sessionId)!!;
        require(session.isActive, "Session not active");

        // Simplified signature verification for hackathon
        // In production, implement proper Ed25519 signature verification
        let dataCell: Cell = beginCell()
            .storeUint(msg.sessionId, 64)
            .storeUint(msg.usageBytes, 64)
            .endCell();

        let dataHash: Int = dataCell.hash();
        require(checkSignature(dataHash, msg.signature, self.backendPubKey), "Invalid signature");

        // Mark session as inactive
        session.isActive = false;
        session.usageBytes = msg.usageBytes;
        self.sessions.set(msg.sessionId, session);

        // Calculate cost (simple: usageBytes * pricePerByte)
        // For hackathon, use fixed price of 1 nanoTON per byte
        let pricePerByte: Int = 1;
        let cost: Int = msg.usageBytes * pricePerByte;

        // Cap cost at deposit amount
        if (cost > session.depositAmount) {
            cost = session.depositAmount;
        }

        let refund: Int = session.depositAmount - cost;

        // Send earnings to node registry
        if (cost > 0) {
            send(SendParameters{
                to: self.nodeRegistryAddress,
                value: cost,
                mode: SendIgnoreErrors,
                body: AddEarnings{
                    nodeId: session.nodeId,
                    amount: cost
                }.toCell()
            });
        }

        // Send refund to user
        if (refund > 0) {
            send(SendParameters{
                to: session.user,
                value: refund,
                mode: SendIgnoreErrors,
                body: "Session ended - refund".asComment()
            });
        }
    }

    // Get session information
    get fun getSession(sessionId: Int): Session? {
        return self.sessions.get(sessionId);
    }

    // Get total sessions
    get fun getTotalSessions(): Int {
        return self.nextSessionId;
    }

    // Get backend public key
    get fun getBackendPubKey(): Int {
        return self.backendPubKey;
    }
}
