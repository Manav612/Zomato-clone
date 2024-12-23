import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
const storage = new MMKV();

export const token_storage = new MMKV({
  id: 'user_storage',
  encryptionKey:'RSA KEY'
    // 'MIICXAIBAAKBgQCgLLY4yXdFkb9r6CeiLZNSMqN7umQAxzbymdwfUZxwAjEZ78JTQs4JZY14nkbkOYcqehg41IUlGZJoesrTAe0kOf3nqpCcsItU4lRLwEXqwTXTAu+7jbc8QQ89g54S3foCxmhO2Op9YX4pmZOX2l2VG66EcShTasnIoET2mAcqgQIDAQABAoGAVxVYEPG/zewaxaEXgz4CHat4ZLmGy0GEJ0vteH2XbvJSHcbTwQ7OFB/JVa2/3y9DxJ1S8/rfVLddeT5hbW1brvsblVS/5teTHwo8jIkMW33uH/yFCp6Z8s5GfZIh/iM3n0DIe45aILLIkfGFiD0L0vWLGLBmCK7ffMJNqBpoJVECQQDo6BBda74Z8OMiSRA6GtaLcZ4wCwaPfFRsxs2+VlWmrpBs1wgcUYuK4M04VgnlCIhDnlrrLuKw1BKy9XbsKa61AkEAsA55Nu8sboM7sINtjBiyS0tyEbd4hYWqzrhGjezBsqFD4+0cApnMnzfipdvOwrrDw+UnEAY1AeRw7uyTerDgHQJAOVrkpMzinKrIlGnfuB9h1CcfqH8el3krpTnz8rp6DzkP0e3GTor6TTH897GgcCmAvP4jL6V1J8yh6jYumgvNvQJBAKhe7yXOTpvR/b+tsZKN+9VubcTrxeNMFjJkoXURu5zuBVNxa5xBIiQS+jrMoEwy+Q3blSQKC5+nrSmSLujjRzECQCKixz92p7QYuHmpijJWbGo7Q7zVjctgKNCw6isYk8MtStm7yjcNo4Qz0wgSUEkO3Xr7RD7PeieW2Mc9ONV0+MY=',
});

const reduxStorage: Storage = {
  setItem: (key, val) => {
    storage.set(key, val);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
