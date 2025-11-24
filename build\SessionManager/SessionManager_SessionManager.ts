import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Session = {
    $$type: 'Session';
    user: Address;
    nodeId: bigint;
    depositAmount: bigint;
    usageBytes: bigint;
    isActive: boolean;
}

export function storeSession(src: Session) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.user);
        b_0.storeUint(src.nodeId, 32);
        b_0.storeCoins(src.depositAmount);
        b_0.storeUint(src.usageBytes, 64);
        b_0.storeBit(src.isActive);
    };
}

export function loadSession(slice: Slice) {
    const sc_0 = slice;
    const _user = sc_0.loadAddress();
    const _nodeId = sc_0.loadUintBig(32);
    const _depositAmount = sc_0.loadCoins();
    const _usageBytes = sc_0.loadUintBig(64);
    const _isActive = sc_0.loadBit();
    return { $$type: 'Session' as const, user: _user, nodeId: _nodeId, depositAmount: _depositAmount, usageBytes: _usageBytes, isActive: _isActive };
}

export function loadTupleSession(source: TupleReader) {
    const _user = source.readAddress();
    const _nodeId = source.readBigNumber();
    const _depositAmount = source.readBigNumber();
    const _usageBytes = source.readBigNumber();
    const _isActive = source.readBoolean();
    return { $$type: 'Session' as const, user: _user, nodeId: _nodeId, depositAmount: _depositAmount, usageBytes: _usageBytes, isActive: _isActive };
}

export function loadGetterTupleSession(source: TupleReader) {
    const _user = source.readAddress();
    const _nodeId = source.readBigNumber();
    const _depositAmount = source.readBigNumber();
    const _usageBytes = source.readBigNumber();
    const _isActive = source.readBoolean();
    return { $$type: 'Session' as const, user: _user, nodeId: _nodeId, depositAmount: _depositAmount, usageBytes: _usageBytes, isActive: _isActive };
}

export function storeTupleSession(source: Session) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.nodeId);
    builder.writeNumber(source.depositAmount);
    builder.writeNumber(source.usageBytes);
    builder.writeBoolean(source.isActive);
    return builder.build();
}

export function dictValueParserSession(): DictionaryValue<Session> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSession(src)).endCell());
        },
        parse: (src) => {
            return loadSession(src.loadRef().beginParse());
        }
    }
}

export type StartSession = {
    $$type: 'StartSession';
    nodeId: bigint;
}

export function storeStartSession(src: StartSession) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(480744981, 32);
        b_0.storeUint(src.nodeId, 32);
    };
}

export function loadStartSession(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 480744981) { throw Error('Invalid prefix'); }
    const _nodeId = sc_0.loadUintBig(32);
    return { $$type: 'StartSession' as const, nodeId: _nodeId };
}

export function loadTupleStartSession(source: TupleReader) {
    const _nodeId = source.readBigNumber();
    return { $$type: 'StartSession' as const, nodeId: _nodeId };
}

export function loadGetterTupleStartSession(source: TupleReader) {
    const _nodeId = source.readBigNumber();
    return { $$type: 'StartSession' as const, nodeId: _nodeId };
}

export function storeTupleStartSession(source: StartSession) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nodeId);
    return builder.build();
}

export function dictValueParserStartSession(): DictionaryValue<StartSession> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStartSession(src)).endCell());
        },
        parse: (src) => {
            return loadStartSession(src.loadRef().beginParse());
        }
    }
}

export type EndSession = {
    $$type: 'EndSession';
    sessionId: bigint;
    usageBytes: bigint;
    signature: Slice;
}

export function storeEndSession(src: EndSession) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3024254239, 32);
        b_0.storeUint(src.sessionId, 64);
        b_0.storeUint(src.usageBytes, 64);
        b_0.storeRef(src.signature.asCell());
    };
}

export function loadEndSession(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3024254239) { throw Error('Invalid prefix'); }
    const _sessionId = sc_0.loadUintBig(64);
    const _usageBytes = sc_0.loadUintBig(64);
    const _signature = sc_0.loadRef().asSlice();
    return { $$type: 'EndSession' as const, sessionId: _sessionId, usageBytes: _usageBytes, signature: _signature };
}

export function loadTupleEndSession(source: TupleReader) {
    const _sessionId = source.readBigNumber();
    const _usageBytes = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    return { $$type: 'EndSession' as const, sessionId: _sessionId, usageBytes: _usageBytes, signature: _signature };
}

export function loadGetterTupleEndSession(source: TupleReader) {
    const _sessionId = source.readBigNumber();
    const _usageBytes = source.readBigNumber();
    const _signature = source.readCell().asSlice();
    return { $$type: 'EndSession' as const, sessionId: _sessionId, usageBytes: _usageBytes, signature: _signature };
}

export function storeTupleEndSession(source: EndSession) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.sessionId);
    builder.writeNumber(source.usageBytes);
    builder.writeSlice(source.signature.asCell());
    return builder.build();
}

export function dictValueParserEndSession(): DictionaryValue<EndSession> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEndSession(src)).endCell());
        },
        parse: (src) => {
            return loadEndSession(src.loadRef().beginParse());
        }
    }
}

export type AddEarnings = {
    $$type: 'AddEarnings';
    nodeId: bigint;
    amount: bigint;
}

export function storeAddEarnings(src: AddEarnings) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(290322301, 32);
        b_0.storeUint(src.nodeId, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadAddEarnings(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 290322301) { throw Error('Invalid prefix'); }
    const _nodeId = sc_0.loadUintBig(32);
    const _amount = sc_0.loadCoins();
    return { $$type: 'AddEarnings' as const, nodeId: _nodeId, amount: _amount };
}

export function loadTupleAddEarnings(source: TupleReader) {
    const _nodeId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'AddEarnings' as const, nodeId: _nodeId, amount: _amount };
}

export function loadGetterTupleAddEarnings(source: TupleReader) {
    const _nodeId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'AddEarnings' as const, nodeId: _nodeId, amount: _amount };
}

export function storeTupleAddEarnings(source: AddEarnings) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nodeId);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserAddEarnings(): DictionaryValue<AddEarnings> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddEarnings(src)).endCell());
        },
        parse: (src) => {
            return loadAddEarnings(src.loadRef().beginParse());
        }
    }
}

export type SessionManager$Data = {
    $$type: 'SessionManager$Data';
    sessions: Dictionary<bigint, Session>;
    nextSessionId: bigint;
    nodeRegistryAddress: Address;
    backendPubKey: bigint;
}

export function storeSessionManager$Data(src: SessionManager$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeDict(src.sessions, Dictionary.Keys.BigUint(64), dictValueParserSession());
        b_0.storeUint(src.nextSessionId, 64);
        b_0.storeAddress(src.nodeRegistryAddress);
        b_0.storeUint(src.backendPubKey, 256);
    };
}

export function loadSessionManager$Data(slice: Slice) {
    const sc_0 = slice;
    const _sessions = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserSession(), sc_0);
    const _nextSessionId = sc_0.loadUintBig(64);
    const _nodeRegistryAddress = sc_0.loadAddress();
    const _backendPubKey = sc_0.loadUintBig(256);
    return { $$type: 'SessionManager$Data' as const, sessions: _sessions, nextSessionId: _nextSessionId, nodeRegistryAddress: _nodeRegistryAddress, backendPubKey: _backendPubKey };
}

export function loadTupleSessionManager$Data(source: TupleReader) {
    const _sessions = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserSession(), source.readCellOpt());
    const _nextSessionId = source.readBigNumber();
    const _nodeRegistryAddress = source.readAddress();
    const _backendPubKey = source.readBigNumber();
    return { $$type: 'SessionManager$Data' as const, sessions: _sessions, nextSessionId: _nextSessionId, nodeRegistryAddress: _nodeRegistryAddress, backendPubKey: _backendPubKey };
}

export function loadGetterTupleSessionManager$Data(source: TupleReader) {
    const _sessions = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserSession(), source.readCellOpt());
    const _nextSessionId = source.readBigNumber();
    const _nodeRegistryAddress = source.readAddress();
    const _backendPubKey = source.readBigNumber();
    return { $$type: 'SessionManager$Data' as const, sessions: _sessions, nextSessionId: _nextSessionId, nodeRegistryAddress: _nodeRegistryAddress, backendPubKey: _backendPubKey };
}

export function storeTupleSessionManager$Data(source: SessionManager$Data) {
    const builder = new TupleBuilder();
    builder.writeCell(source.sessions.size > 0 ? beginCell().storeDictDirect(source.sessions, Dictionary.Keys.BigUint(64), dictValueParserSession()).endCell() : null);
    builder.writeNumber(source.nextSessionId);
    builder.writeAddress(source.nodeRegistryAddress);
    builder.writeNumber(source.backendPubKey);
    return builder.build();
}

export function dictValueParserSessionManager$Data(): DictionaryValue<SessionManager$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSessionManager$Data(src)).endCell());
        },
        parse: (src) => {
            return loadSessionManager$Data(src.loadRef().beginParse());
        }
    }
}

 type SessionManager_init_args = {
    $$type: 'SessionManager_init_args';
    nodeRegistryAddress: Address;
    backendPubKey: bigint;
}

function initSessionManager_init_args(src: SessionManager_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.nodeRegistryAddress);
        b_0.storeInt(src.backendPubKey, 257);
    };
}

async function SessionManager_init(nodeRegistryAddress: Address, backendPubKey: bigint) {
    const __code = Cell.fromHex('b5ee9c72410212010003a7000228ff008e88f4a413f4bcf2c80bed5320e303ed43d9010902027102070203786003050154a9c9ed44d0d200019cf404d33ffa40d3ff55306c149ffa40810101d7005902d1016d027002e2db3c6c41040002200154a900ed44d0d200019cf404d33ffa40d3ff55306c149ffa40810101d7005902d1016d027002e2db3c6c41060002220185bf80976a268690000ce7a02699ffd2069ffaa98360a4ffd20408080eb802c816880b6813801712a81ed9e36209037491836cc90377968403792b782f11037491836ef408004c8040250259f40f6fa192306ddf206e92306d8e11d0fa40d31ffa00d33fd20055406c156f05e203d63001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200019cf404d33ffa40d3ff55306c149ffa40810101d7005902d1016d027002e205925f05e003d70d1ff2e0822182101ca79615bae302218210b442751fbae302018210946a98b6bae3025f05f2c0820a0c1101fc31d31f30f8416f24135f038158ac21c200f2f422f8425a707f04431380405025c855405045ce12cb1f01fa02cb3fca00c9103412206e953059f45b30944133f417e201a488443012f8427f705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055305034f400cb3fcecbffc9ed540b00260000000053657373696f6e207374617274656401e431d33fd33fd430d02480402459f40f6fa192306ddf206e92306d8e11d0fa40d31ffa00d33fd20055406c156f05e2206ef2d0806f25816cbf32f2f4c85260cb3f5250cb3fc9f9008200bd11515bf91014f2f470248040c82551355138506355405045ce12cb1f01fa02cb3fca00c9103841600d02f6206e953059f45b30944133f417e2543201bc923020de66a121c2008e50725142c8598210114df77d5003cb1fcb1f01fa02c927431350555a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00923330e221c200923330e30d40030e1001787288103510255a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000f00340000000053657373696f6e20656e646564202d20726566756e640026c87f01ca0055305034f400cb3fcecbffc9ed540094d33f30c8018210aff90f5758cb1fcb3fc9443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055305034f400cb3fcecbffc9ed54d3e64dad');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initSessionManager_init_args({ $$type: 'SessionManager_init_args', nodeRegistryAddress, backendPubKey })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const SessionManager_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    22700: { message: "Deposit required" },
    27839: { message: "Session not active" },
    48401: { message: "Invalid signature" },
} as const

export const SessionManager_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Deposit required": 22700,
    "Session not active": 27839,
    "Invalid signature": 48401,
} as const

const SessionManager_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Session","header":null,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"nodeId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"depositAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"usageBytes","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"isActive","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"StartSession","header":480744981,"fields":[{"name":"nodeId","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"EndSession","header":3024254239,"fields":[{"name":"sessionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"usageBytes","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"AddEarnings","header":290322301,"fields":[{"name":"nodeId","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"SessionManager$Data","header":null,"fields":[{"name":"sessions","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Session","valueFormat":"ref"}},{"name":"nextSessionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"nodeRegistryAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"backendPubKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
]

const SessionManager_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "StartSession": 480744981,
    "EndSession": 3024254239,
    "AddEarnings": 290322301,
}

const SessionManager_getters: ABIGetter[] = [
    {"name":"getSession","methodId":126994,"arguments":[{"name":"sessionId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Session","optional":true}},
    {"name":"getTotalSessions","methodId":68864,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBackendPubKey","methodId":68041,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const SessionManager_getterMapping: { [key: string]: string } = {
    'getSession': 'getGetSession',
    'getTotalSessions': 'getGetTotalSessions',
    'getBackendPubKey': 'getGetBackendPubKey',
}

const SessionManager_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"StartSession"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EndSession"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class SessionManager implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = SessionManager_errors_backward;
    public static readonly opcodes = SessionManager_opcodes;
    
    static async init(nodeRegistryAddress: Address, backendPubKey: bigint) {
        return await SessionManager_init(nodeRegistryAddress, backendPubKey);
    }
    
    static async fromInit(nodeRegistryAddress: Address, backendPubKey: bigint) {
        const __gen_init = await SessionManager_init(nodeRegistryAddress, backendPubKey);
        const address = contractAddress(0, __gen_init);
        return new SessionManager(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new SessionManager(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SessionManager_types,
        getters: SessionManager_getters,
        receivers: SessionManager_receivers,
        errors: SessionManager_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: StartSession | EndSession | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StartSession') {
            body = beginCell().store(storeStartSession(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EndSession') {
            body = beginCell().store(storeEndSession(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetSession(provider: ContractProvider, sessionId: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(sessionId);
        const source = (await provider.get('getSession', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleSession(result_p) : null;
        return result;
    }
    
    async getGetTotalSessions(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getTotalSessions', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetBackendPubKey(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getBackendPubKey', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}