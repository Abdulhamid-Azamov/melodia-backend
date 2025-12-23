import { hash, compare} from 'bcrypt';

class Crypto{
    async hash(data) {
        const hashedData = await hash(data, 7);
        return hashedData
    }

    async compare(data, hashedData){
        const isMatch = await compare(data,hashedData);
        return isMatch;
    }
}
export default new Crypto();