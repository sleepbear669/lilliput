import {computed, observable} from 'mobx';


let accountLogId = 0;

export class AccountLog {
    id: number = accountLogId++;
    @observable import: number | '' = '';
    @observable export: number | '' = '';
    private account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    @computed get balance() {
        let seed = this.account.seed ? this.account.seed : 0;
        const balance = this.account.accountLogs
            .filter(accountLog => !this.isEmpty() && this.id >= accountLog.id)
            .reduce((a, b) => {
                const importValue = b.import !== '' ? parseInt(b.import + '') : 0;
                const exportValue = b.export !== '' ? parseInt(b.export + '') : 0;
                return a + importValue + exportValue;
            }, parseInt(seed + ''));
        return this.isEmpty() ? '' : balance;
    }

    isEmpty() {
        return this.import === '' && this.export === '';
    }
}

class Account {
    name: string;
    @observable seed: number;
    @observable accountLogs: AccountLog[] = new Array<AccountLog>(30);

    constructor(name: string, seed: number) {
        this.name = name;
        this.seed = seed;
        this.accountLogs = this.accountLogs.map(() => new AccountLog(this));
    }
}

export default Account;
