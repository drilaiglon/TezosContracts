import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const split_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Split_basic {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/split_basic.arl", {}, params)).address;
        this.address = address;
    }
    async split(params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "split", split_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_split_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "split", split_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const split_basic = new Split_basic();
